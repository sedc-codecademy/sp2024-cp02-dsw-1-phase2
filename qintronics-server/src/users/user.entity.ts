import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/common/enums/roles.enum';
import { Order } from 'src/orders/order.entity';
import { UserInfo } from 'src/user-info/user-info.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @Column({
    type: String,
    array: true,
    nullable: true,
  })
  @ApiProperty({
    type: String,
    isArray: true,
    description: `User's refresh tokens`,
    example: [
      'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjdmZTI2NC04MjliLTQ5YTYtOTk2OS0xNTRmYjFmMTUyMzciLCJlbWFpbCI6ImN1c3RvbWVyQGV4YW1wbGUuY29tIiwicm9sZSI6IkN1c3RvbWVyIiwicmVmcmVzaFRva2VucyI6W10sImlhdCI6MTcyNzUzMzAxMCwiZXhwIjoxNzI4MTM3ODEwLCJpc3MiOiJRaW50cm9uaWNzIn0.i0AdtjMZS_58gsRL6ybELVNykqWmxTfqKG-onJJN-34',
    ],
  })
  refreshTokens: string[] = [];
  // Refresh tokens are an array in case the user logs in from multiple devices, i.e. multiple refresh tokens are saved

  @OneToOne(() => UserInfo, (userInfo) => userInfo.userId, { cascade: true })
  userInfo: UserInfo;

  @OneToMany(() => Order, (order) => order.user)
  @ApiPropertyOptional({
    type: Order,
  })
  orders: Order[];

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
    description: 'The time and date the user is created at',
    example: '2024-05-01 00:00:00',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @ApiProperty({
    type: Date,
    description: 'The time and date the user is deleted at',
    example: '2024-05-01 00:00:00',
  })
  deletedAt: Date;
}
