import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { In, Repository } from 'typeorm';
import { OrderCreateDto } from './dtos/order-create.dto';
import { Product } from 'src/products/product.entity';
import { StatusUpdateDto } from './dtos/status-update.dto';
import { OrderUpdateDto } from './dtos/order-update.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  updateTotal(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price, 0);
  }

  //* GET ALL ORDERS
  getAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['products', 'user'],
    });
  }

  //* GET ORDER BY USER ID
  getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['products'],
      where: {
        userId,
      },
    });
  }

  //* CREATE ORDER
  async createOrder(orderEntity: OrderCreateDto): Promise<Order> {
    const products = await this.productsRepository.findBy({
      id: In(orderEntity.products),
    });

    const total = this.updateTotal(products);
    const order = {
      ...orderEntity,
      isTaken: false,
      isDelivered: false,
      isCanceled: false,
      orderDate: new Date(orderEntity.deliveryDate),
      products: products,
      total,
    };

    const newOrder = this.ordersRepository.create(order);
    return this.ordersRepository.save(newOrder);
  }

  //* CHANGE ORDER STATUS (DELIVERY PERSON)
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

  //* UPDATE ORDER (ADMIN)
  async updateOrder(
    orderUpdateDto: OrderUpdateDto,
    orderId: string,
  ): Promise<Order> {
    const { products, ...orderData } = orderUpdateDto;

    let order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['products'],
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    const total = this.updateTotal(order.products);

    let updatedOrder = {
      ...order,
      total,
      ...orderData,
    };
    if (products && products.length > 0) {
      const products = await this.productsRepository.findBy({
        id: In(orderUpdateDto.products),
      });

      updatedOrder.products = products;
    }

    return this.ordersRepository.save(updatedOrder);
  }
}
