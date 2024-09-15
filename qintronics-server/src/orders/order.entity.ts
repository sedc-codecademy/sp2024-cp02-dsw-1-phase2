import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'Order ID',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: Boolean,
    description: 'Order Taken Status',
    example: true,
  })
  isTaken: boolean;

  @Column()
  @ApiProperty({
    type: Boolean,
    description: 'Order Delivered Status',
    example: true,
  })
  isDelivered: boolean;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Order address',
    example: 'Partizanska 1',
  })
  address: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  @ApiProperty({
    type: User,
  })
  user: User;

  @Column({
    name: 'user_id',
  })
  @ApiProperty({
    type: String,
    description: 'The ID of the user',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  userId: string;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  @ApiProperty({ type: () => Product, isArray: true })
  products: Product[];
}
