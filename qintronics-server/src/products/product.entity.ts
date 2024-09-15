import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/category.entity';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'Product ID',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product name',
    example: 'Lenovo ThinkPad X1 Carbon Gen 9',
  })
  name: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product brand',
    example: 'Lenovo',
  })
  brand: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product description',
    example: 'Ultra-lightweight business laptop with powerful performance.',
  })
  description: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product image',
    example: './images/laptops/lenovo-1.jpg',
  })
  img: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product specifications',
    example:
      'CPU: Intel Core i7-1165G7, GPU: Intel Iris Xe, RAM: 16GB, Storage: 512GB SSD, Display: 14 FHD, Camera: 720p HD, Battery: Up to 15 hours, OS: Windows 10 Pro',
  })
  specifications: string;

  @Column()
  @ApiProperty({
    type: Number,
    description: 'Product price',
    example: 1499,
  })
  price: number;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Product warranty',
    example: '3 years',
  })
  warranty: string;

  @Column()
  @ApiProperty({
    type: Number,
    description: 'Product availability',
    example: 20,
  })
  availability: number;

  @Column()
  @ApiProperty({
    type: Number,
    description: 'Product discount',
    example: 10,
  })
  discount: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  @ApiProperty({
    type: Category,
  })
  category: Category;

  @Column({
    name: 'category_id',
  })
  @ApiProperty({
    type: String,
    description: 'The ID of the products category',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  categoryId: string;

  @ManyToMany(() => Order, (order) => order.products)
  @ApiProperty({ type: () => Order, isArray: true })
  orders: Order[];
}
