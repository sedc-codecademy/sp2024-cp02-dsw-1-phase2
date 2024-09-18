import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

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

  //* CREATE ORDER
}
