import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'Category ID',
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: String,
    description: 'Category name',
    example: 'Laptops',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiPropertyOptional({
    type: Product,
  })
  products: Product[];

  @CreateDateColumn()
  @ApiProperty({
    type: String,
    description: 'Category created date',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: String,
    description: 'Category updated date',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
