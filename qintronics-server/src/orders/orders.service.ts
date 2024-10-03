import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { SortingOrder } from 'src/common/enums/sorting.enum';
import { PageMetaDto } from 'src/common/ordersPagination/page-meta.dto';
import { PageOptionsDto } from 'src/common/ordersPagination/page-options.dto';
import { PageDto } from 'src/common/ordersPagination/page.dto';
import { ICurrentUser } from 'src/common/types/current-user.interface';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { OrderCreateDto, ProductsAndQuantity } from './dtos/order-create.dto';
import { OrderQueryDto } from './dtos/order-query.dto';
import { OrderReturnDto } from './dtos/order-return.dto';
import { OrderUpdateDto } from './dtos/order-update.dto';
import { StatusUpdateDto } from './dtos/status-update.dto';
import { OrderProduct } from './orders-products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductsRepository: Repository<OrderProduct>,
  ) {}

  // * CALCULATE TOTAL
  updateTotal(
    products: Product[],
    productsAndQuantity: ProductsAndQuantity[],
  ): number {
    return products.reduce((acc, product) => {
      const productQuantity =
        productsAndQuantity.find((pq) => pq.productId === product.id)
          ?.quantity || 1;
      return acc + product.price * productQuantity;
    }, 0);
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

    if (!product || product.availability < quantity) {
      throw new NotFoundException(
        'Product not found or does not have enough stock',
      );
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
      sortTotal,
      userMail,
      isDelivered,
      isTaken,
      isCanceled,
      isPaid,
      orderNumber,
      sortDelDate,
    }: OrderQueryDto,
  ): Promise<PageDto<OrderReturnDto>> {
    let whereQuery = {} satisfies FindOptionsWhere<Order>;
    let orderQuery = {} satisfies FindOptionsOrder<Order>;

    isDelivered ? (whereQuery = { ...whereQuery, isDelivered }) : {};
    isTaken ? (whereQuery = { ...whereQuery, isTaken }) : {};
    isCanceled ? (whereQuery = { ...whereQuery, isCanceled }) : {};
    isPaid ? (whereQuery = { ...whereQuery, isPaid }) : {};
    orderNumber ? (whereQuery = { ...whereQuery, orderNumber }) : {};
    userMail
      ? (whereQuery = {
          ...whereQuery,
          user: { email: ILike(`%${userMail}%`) },
        })
      : {};

    if (sortTotal) {
      sortTotal === SortingOrder.ASC
        ? (orderQuery = { ...orderQuery, total: 'ASC' })
        : (orderQuery = { ...orderQuery, total: 'DESC' });
    }

    if (sortDelDate) {
      sortDelDate === SortingOrder.ASC
        ? (orderQuery = { ...orderQuery, prefDeliveryDate: 'ASC' })
        : (orderQuery = { ...orderQuery, prefDeliveryDate: 'DESC' });
    }

    const [entities, itemCount] = await this.ordersRepository.findAndCount({
      where: whereQuery,
      order: orderQuery,
      relations: {
        orderProduct: {
          product: true,
        },
        user: true,
      },
      skip: paginationQueries.skip,
      take: paginationQueries.perPage,
    });

    const pageMetaDto = new PageMetaDto({ itemCount, paginationQueries });
    const transformedOrders = entities.map((order) => {
      const dto = plainToInstance(OrderReturnDto, order, {
        excludeExtraneousValues: true,
      });

      dto.productsAndQuantity = order.orderProduct.map((op) => ({
        product: op.product,
        quantity: op.quantity,
      }));
      return dto;
    });
    return new PageDto(transformedOrders, pageMetaDto);
  }

  // * GET ORDER BY ID
  async getOrderById(orderId: string): Promise<Order> {
    const orderByID = await this.ordersRepository.findOne({
      relations: {
        orderProduct: {
          product: true,
        },
      },
      where: { id: orderId },
    });

    if (!orderByID) throw new NotFoundException('Order not found');
    return orderByID;
  }

  //* GET ORDERS BY USER ID
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const ordersOfUser = await this.ordersRepository.find({
      relations: {
        orderProduct: {
          product: true,
        },
      },
      where: {
        userId,
      },
    });
    if (!ordersOfUser || ordersOfUser.length < 1)
      throw new NotFoundException('No orders by this user');
    return ordersOfUser;
  }

  //* CREATE ORDER
  async createOrder(
    body: OrderCreateDto,
    currentUser: ICurrentUser,
  ): Promise<Order> {
    const products = await this.productsRepository.findBy({
      id: In(body.productsAndQuantity.map((product) => product.productId)),
    });

    const productPriceMap = new Map<string, number>();
    products.forEach((product) => {
      productPriceMap.set(product.id, product.price);
    });

    const total = this.updateTotal(products, body.productsAndQuantity);

    const order = {
      ...body,
      userId: currentUser?.userId,
      isTaken: false,
      isDelivered: false,
      isCanceled: false,
      total,
    };

    const newOrder = this.ordersRepository.create(order);
    const createdOrder = await this.ordersRepository.save(newOrder);

    for (const { productId, quantity } of body.productsAndQuantity) {
      const price = productPriceMap.get(productId);
      await this.addProductToOrder(createdOrder.id, productId, quantity, price);
    }

    return createdOrder;
  }

  // * CANCEL ORDER (USER)
  async cancelOrder(
    orderId: string,
    user: ICurrentUser | undefined,
  ): Promise<Order> {
    const orderToBeCanceled = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: {
        orderProduct: {
          product: true,
        },
      },
    });

    if (!orderToBeCanceled) {
      throw new NotFoundException('No such order');
    }

    if (orderToBeCanceled.userId !== user?.userId && user?.role !== 'Admin') {
      throw new UnauthorizedException('Not authorized to cancel this order');
    }

    const updatedOrder = this.ordersRepository.merge(orderToBeCanceled, {
      isCanceled: true,
      lastUpdatedBy: user?.email,
    });
    return this.ordersRepository.save(updatedOrder);
  }

  //* CHANGE ORDER STATUS (DELIVERY PERSON)
  async updateOrderStatus(
    status: StatusUpdateDto,
    orderId: string,
    user: ICurrentUser | undefined,
  ): Promise<Order> {
    const orderToBeUpdated = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: {
        orderProduct: {
          product: true,
        },
      },
    });

    if (!orderToBeUpdated) {
      throw new NotFoundException('Order not found');
    }

    const updatedOrder = this.ordersRepository.merge(orderToBeUpdated, status);
    updatedOrder.lastUpdatedBy = user?.email;
    return this.ordersRepository.save(updatedOrder);
  }

  //* UPDATE ORDER (ADMIN)
  async updateOrder(
    updateBody: OrderUpdateDto,
    orderId: string,
    user: ICurrentUser | undefined,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: {
        orderProduct: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    let updatedData = {
      ...order,
      ...updateBody,
    };

    const updatedOrder = this.ordersRepository.merge(order, updatedData);
    updatedOrder.lastUpdatedBy = user?.email;
    return this.ordersRepository.save(updatedOrder);
  }

  // * DELETE ORDER
  async deleteOrder(orderId: string): Promise<void> {
    const deleteAnswer = await this.ordersRepository.softDelete(orderId);
    if (deleteAnswer.affected < 1)
      throw new NotFoundException('No order with this Id');
  }
}
