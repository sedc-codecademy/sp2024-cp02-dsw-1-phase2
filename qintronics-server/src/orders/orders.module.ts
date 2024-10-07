import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Order } from './order.entity';
import { OrderProduct } from './orders-products.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderProduct, User]),
    EmailModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
