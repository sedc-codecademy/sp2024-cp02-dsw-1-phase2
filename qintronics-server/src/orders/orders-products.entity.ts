import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';

@Entity('orders_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderProduct)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({
    name: 'order_id',
  })
  orderId: string;

  @ManyToOne(() => Product, (product) => product.orderProduct)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    name: 'product_id',
  })
  productId: string;

  @Column()
  quantity: number;

  @Column()
  priceAtOrderTime: number;
}
