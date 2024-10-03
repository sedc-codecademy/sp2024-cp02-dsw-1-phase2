import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';
import { OrderProduct } from './orders-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderProduct])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
