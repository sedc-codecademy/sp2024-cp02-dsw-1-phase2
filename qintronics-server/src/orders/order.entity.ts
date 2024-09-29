import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from './orders-products.entity';

@Entity()
export class Order {
  // * UUID
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'Order ID',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  // * ORDER NUMBER
  @Column({
    name: 'order_number',
  })
  @Generated('increment')
  @ApiProperty({
    type: Number,
    description: 'Order Number',
    example: 202,
  })
  orderNumber: number;

  // * ORDER PROCESSING STATUS
  @Column({
    name: 'is_taken',
    default: false,
  })
  @ApiProperty({
    type: Boolean,
    description: 'Order Processing Status',
    example: true,
  })
  isTaken: boolean;

  // * ORDER CANCELING STATUS
  @Column({
    name: 'is_cancelled',
    default: false,
  })
  @ApiProperty({
    type: Boolean,
    description: 'Order Canceling Status',
    example: true,
  })
  isCancelled: boolean;

  // * ORDER DELIVERY STATUS
  @Column({
    name: 'is_delivered',
    default: false,
  })
  @ApiProperty({
    type: Boolean,
    description: 'Order Delivery Status',
    example: true,
  })
  isDelivered: boolean;

  // * ORDER PAYMENT STATUS
  @Column({
    name: 'is_paid',
  })
  @ApiProperty({
    type: Boolean,
    description: 'Order Payment Status',
    example: true,
  })
  isPaid: boolean;

  // * ORDER ADDRESS
  @Column()
  @ApiProperty({
    type: String,
    description: 'Order address',
    example: 'Partizanska 1',
  })
  address: string;

  // * ORDER ZIP CODE
  @Column()
  @ApiProperty({
    type: Number,
    description: 'Order address zip code',
    example: 1000,
  })
  zip: number;

  // * PREFERRED DELIVERY DATE
  @Column({
    type: Date,
    name: 'delivery_date',
  })
  @ApiProperty({
    type: Date,
    description: 'Preferred date of delivery',
    example: '2024-11-21',
  })
  deliveryDate: Date;

  // * TOTAL PRICE
  @Column({
    type: 'double precision',
  })
  @ApiProperty({
    type: Number,
    description: 'Total price of the order',
    example: 2000,
  })
  total: number;

  // * USER RELATION
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  @ApiProperty({
    type: User,
  })
  user: User;

  // * USER ID
  @Column({
    name: 'user_id',
  })
  @ApiProperty({
    type: String,
    description: 'The ID of the user',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  userId: string;

  // * PRODUCT RELATION
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct: OrderProduct[];

  // * Created At
  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
    example: '2024-04-21 11:13:15.61689',
  })
  createdAt: Date;

  // * Updated At
  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: Date,
    example: '2024-04-21 11:13:15.61689',
  })
  updatedAt: Date;

  // * Updated By
  @Column({
    name: 'last_updated_by',
    nullable: true,
  })
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'user@mail.com',
  })
  lastUpdatedBy: string;

  // * Deleted At
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @ApiProperty({
    type: Date,
    example: '2024-04-21 11:13:15.61689',
    nullable: true,
  })
  deletedAt: Date;
}
