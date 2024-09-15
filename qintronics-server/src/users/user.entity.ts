import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/common/enums/roles.enum';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: `User's ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'marija@gmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    type: String,
    description: `User's password`,
    example: 'Pass111!',
  })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: `User's phone number`,
    example: '+3891234578',
  })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: `User's address`,
    example: 'Partizanska, bb',
  })
  address: string;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: `User's city`,
    example: 'Skopje',
  })
  city: string;

  @Column({
    name: 'postal_code',
    nullable: true,
  })
  @ApiProperty({
    type: Number,
    description: `User's postal code`,
    example: 1000,
  })
  postalCode: number;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: `User's country`,
    example: 'Macedonia',
  })
  country: string;

  @Column({
    enum: Role,
    enumName: 'role',
    default: Role.Customer,
  })
  @ApiProperty({
    enum: Role,
    description: `User's role`,
    example: Role.Customer,
    default: Role.Customer,
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  @ApiPropertyOptional({
    type: Order,
  })
  orders: Order[];
}
