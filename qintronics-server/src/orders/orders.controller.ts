import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrderCreateDto, ProductAndQuantity } from './dtos/order-create.dto';
import { StatusUpdateDto } from './dtos/status-update.dto';
import { OrderUpdateDto } from './dtos/order-update.dto';
import { PageOptionsDto } from 'src/common/ordersPagination/page-options.dto';
import { PageDto } from 'src/common/ordersPagination/page.dto';
import { OrderQueryDto } from './dtos/order-query.dto';
import { OrderProduct } from './orders-products.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  //* GET ALL ORDERS W/ QUERIES AND PAGINATION
  @Get('/')
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiOkResponse({
    type: [Order],
    description: 'Orders successfully retrieved',
  })
  getAll(
    @Query() paginationQueries: PageOptionsDto,
    @Query() queryParams: OrderQueryDto,
  ): Promise<PageDto<Order>> {
    return this.ordersService.getAll(paginationQueries, queryParams);
  }

  //* GET ORDER BY ID
  @Get('/single/:orderId')
  @ApiOperation({ summary: 'Retrieve order by ID' })
  @ApiParam({
    type: String,
    name: 'orderId',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
    description: 'Id of the order',
  })
  @ApiOkResponse({
    type: Order,
    description: 'Order successfully retrieved',
  })
  getOrderById(@Param('orderId') orderId: string): Promise<Order> {
    return this.ordersService.getOrderById(orderId);
  }

  //* GET ORDER BY USER ID
  @Get('/:userId')
  @ApiOperation({
    summary: 'Retrieve all orders made by a user by providing users ID',
  })
  @ApiParam({
    type: String,
    name: 'userId',
    example: 'de5169ad-3259-45c0-86ce-3918ca5d7ac7',
    description: 'Id of the user',
  })
  @ApiOkResponse({
    type: [Order],
    description: 'Orders successfully retrieved',
  })
  getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }

  //* CREATE ORDER
  @Post('/')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: OrderCreateDto,
  })
  @ApiOkResponse({
    type: Order,
    description: 'Order successfully created',
  })
  createOrder(@Body() order: OrderCreateDto): Promise<Order> {
    return this.ordersService.createOrder(order);
  }

  //* CANCEL ORDER (USER, ADMIN)
  @Put('/cancel/:orderId')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiParam({
    type: String,
    name: 'orderId',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
    description: 'Id of the order',
  })
  @ApiOkResponse({
    type: Order,
    description: 'Order successfully canceled',
  })
  cancelOrder(@Param('orderId') orderId: string): Promise<Order> {
    return this.ordersService.cancelOrder(orderId);
  }

  //* CHANGE ORDER STATUS (DELIVERY PERSON)
  @Put('/status/:orderId')
  @ApiOperation({ summary: 'Change order status' })
  @ApiBody({
    type: StatusUpdateDto,
  })
  @ApiParam({
    type: String,
    name: 'orderId',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
    description: 'Id of the order',
  })
  @ApiOkResponse({
    type: Order,
    description: 'Order status successfully updated',
  })
  updateOrderStatus(
    @Body() status: StatusUpdateDto,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(status, orderId);
  }
  //* UPDATE ORDER (ADMIN)
  @Put('/update/:orderId')
  @ApiOperation({ summary: 'Make changes to the order' })
  @ApiBody({
    type: OrderUpdateDto,
  })
  @ApiParam({
    type: String,
    name: 'orderId',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
    description: 'Id of the order',
  })
  @ApiOkResponse({
    type: Order,
    description: 'Order successfully updated',
  })
  updateOrder(
    @Body() order: OrderUpdateDto,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.ordersService.updateOrder(order, orderId);
  }

  //* DELETE ORDER (ADMIN)
  @Delete('/delete/:orderId')
  @ApiOperation({ summary: 'Delete an order by its ID' })
  @ApiParam({
    type: String,
    name: 'orderId',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
    description: 'Id of the order',
  })
  @ApiOkResponse({
    status: 204,
    description: 'Order successfully deleted',
  })
  deleteOrder(@Param('orderId') orderId: string): Promise<void> {
    return this.ordersService.deleteOrder(orderId);
  }
}
