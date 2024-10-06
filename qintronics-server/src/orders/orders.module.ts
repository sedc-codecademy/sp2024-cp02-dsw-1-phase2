import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Order } from './order.entity';
import { OrderProduct } from './orders-products.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderProduct])],
  controllers: [OrdersController],
  providers: [OrdersService, EmailService],
})
export class OrdersModule {}
