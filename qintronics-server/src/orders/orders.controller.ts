import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrderCreateDto } from './dtos/order-create.dto';
import { StatusUpdateDto } from './dtos/status-update.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  //* GET ALL ORDERS
  @Get('/')
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiOkResponse({
    type: [Order],
    description: 'Orders successfully retrieved',
  })
  getAll(): Promise<Order[]> {
    return this.ordersService.getAll();
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
}
