import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';
import {
  FindOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { OrderCreateDto } from './dtos/order-create.dto';
import { OrderUpdateDto } from './dtos/order-update.dto';
import { StatusUpdateDto } from './dtos/status-update.dto';
import { OrderProduct } from './orders-products.entity';
import { PageOptionsDto } from 'src/common/ordersPagination/page-options.dto';
import { PageDto } from 'src/common/ordersPagination/page.dto';
import { PageMetaDto } from 'src/common/ordersPagination/page-meta.dto';
import { OrderQueryDto } from './dtos/order-query.dto';
import { SortingOrder } from 'src/common/enums/sorting.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductsRepository: Repository<OrderProduct>,
  ) {}

  // * CALCULATE TOTAL
  updateTotal(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price, 0);
  }

  // * ADD PRODUCT TO ORDER
  async addProductToOrder(
    orderId: string,
    productId: string,
    quantity: number,
    priceAtOrderTime: number,
  ): Promise<OrderProduct> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const orderProduct = this.orderProductsRepository.create({
      order,
      product,
      quantity,
      priceAtOrderTime,
    });
    return await this.orderProductsRepository.save(orderProduct);
  }

  //* GET ALL ORDERS W/ QUERIES AND PAGINATION
  async getAll(
    paginationQueries: PageOptionsDto,
    {
      userMail,
      sortTotal,
      isDelivered,
      isTaken,
      isCancelled,
      isPaid,
    }: OrderQueryDto,
  ): Promise<PageDto<Order>> {
    let whereQuery = {} satisfies FindOptionsWhere<Order>;
    let orderQuery = {} satisfies FindOptionsOrder<Order>;

    isDelivered ? (whereQuery = { ...whereQuery, isDelivered }) : {};
    isTaken ? (whereQuery = { ...whereQuery, isTaken }) : {};
    isCancelled ? (whereQuery = { ...whereQuery, isCancelled }) : {};
    isPaid ? (whereQuery = { ...whereQuery, isPaid }) : {};

    if (userMail) {
      whereQuery = {
        ...whereQuery,
        user: { email: ILike(`%${userMail}%`) },
      };
    }

    if (sortTotal) {
      sortTotal === SortingOrder.ASC
        ? (orderQuery = { ...orderQuery, total: 'ASC' })
        : (orderQuery = { ...orderQuery, total: 'DESC' });
    }

    const [entities, itemCount] = await this.ordersRepository.findAndCount({
      where: whereQuery,
      order: orderQuery,
      relations: ['orderProduct', 'user'],
      skip: paginationQueries.skip,
      take: paginationQueries.perPage,
    });

    const pageMetaDto = new PageMetaDto({ itemCount, paginationQueries });
    console.log('pageMetaDto', pageMetaDto);
    return new PageDto(entities, pageMetaDto);
  }

  // * GET ORDER BY ID
  async getOrderById(orderId: string): Promise<Order> {
    const orderByID = await this.ordersRepository.findOne({
      relations: {
        orderProduct: {
          product: true,
        },
        user: true,
      },
      where: { id: orderId },
    });

    if (!orderByID) throw new NotFoundException('Order not found');
    return orderByID;
  }

  //* GET ORDER BY USER ID
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const ordersOfUser = await this.ordersRepository.find({
      relations: {
        orderProduct: {
          product: true,
        },
        user: true,
      },
      where: {
        userId,
      },
    });
    if (!ordersOfUser) throw new NotFoundException('No orders by this user');
    return ordersOfUser;
  }

  //* CREATE ORDER
  async createOrder(body: OrderCreateDto): Promise<Order> {
    const products = await this.productsRepository.findBy({
      id: In(body.prodAndQuant.map((product) => product.productId)),
    });

    const productPriceMap = new Map<string, number>();
    products.forEach((product) => {
      productPriceMap.set(product.id, product.price);
    });
    console.log('product price map', productPriceMap);

    const total = this.updateTotal(products);

    const order = {
      ...body,
      isTaken: false,
      isDelivered: false,
      isCanceled: false,
      orderDate: new Date(),
      total,
    };

    const newOrder = this.ordersRepository.create(order);
    const createdOrder = await this.ordersRepository.save(newOrder);

    for (const { productId, quantity } of body.prodAndQuant) {
      const price = productPriceMap.get(productId);
      await this.addProductToOrder(createdOrder.id, productId, quantity, price);
    }

    return createdOrder;
  }

  // * CANCEL ORDER (USER, ADMIN)
  async cancelOrder(orderId: string): Promise<Order> {
    const orderToBeCanceled = await this.ordersRepository.findOneBy({
      id: orderId,
    });

    if (!orderToBeCanceled) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = this.ordersRepository.merge(orderToBeCanceled, {
      isCancelled: true,
    });
    return this.ordersRepository.save(updatedOrder);
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

      // updatedOrder.orde = products;
      updatedOrder.total = this.updateTotal(products);
    }

    return this.ordersRepository.save(updatedOrder);
  }

  // * DELETE ORDER
  async deleteOrder(orderId: string): Promise<void> {
    const deleteAnswer = await this.ordersRepository.softDelete(orderId);
    if (deleteAnswer.affected < 1)
      throw new NotFoundException('No order with this Id');
  }
}
