import { Injectable, NotFoundException } from '@nestjs/common';
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
  async createOrder(body: OrderCreateDto): Promise<Order> {
    const products = await this.productsRepository.findBy({
      id: In(body.products),
    });

    const total = this.updateTotal(products);
    const order = {
      ...body,
      isTaken: false,
      isDelivered: false,
      isCanceled: false,
      orderDate: new Date(),
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
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = this.ordersRepository.merge(orderToBeUpdated, status);
    return this.ordersRepository.save(updatedOrder);
  }

  //* UPDATE ORDER (ADMIN)
  async updateOrder(body: OrderUpdateDto, orderId: string): Promise<Order> {
    const { products: productIds, ...orderData } = body;

    let order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['products'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    let updatedOrder = {
      ...order,
      ...orderData,
    };
    if (productIds.length > 0) {
      const products = await this.productsRepository.findBy({
        id: In(productIds),
      });

      updatedOrder.products = products;
      updatedOrder.total = this.updateTotal(products);
    }

    return this.ordersRepository.save(updatedOrder);
  }
}
