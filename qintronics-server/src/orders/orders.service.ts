import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { In, Repository } from 'typeorm';
import { OrderCreateDto } from './dtos/order-create.dto';
import { Product } from 'src/products/product.entity';
import { StatusUpdateDto } from './dtos/status-update.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        userId,
      },
    });
  }

  async createOrder(orderEntity: OrderCreateDto): Promise<Order> {
    const products = await this.productsRepository.findBy({
      id: In(orderEntity.products),
    });

    const total = products.reduce((acc, product) => acc + product.price, 0);

    const order = {
      ...orderEntity,
      isTaken: false,
      isDelivered: false,
      orderDate: new Date(orderEntity.deliveryDate),
      products: products,
      total,
    };

    const newOrder = this.ordersRepository.create(order);
    return this.ordersRepository.save(newOrder);
  }

  async updateOrderStatus(
    status: StatusUpdateDto,
    orderId: string,
  ): Promise<Order> {
    const orderToBeUpdated = await this.ordersRepository.findOneBy({
      id: orderId,
    });

    if (!orderToBeUpdated) {
      throw new Error('Order not found');
    }

    const updatedOrder = this.ordersRepository.merge(orderToBeUpdated, status);
    return this.ordersRepository.save(updatedOrder);
  }
}
