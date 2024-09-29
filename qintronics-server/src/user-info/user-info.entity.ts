import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: `Card ID`,
    example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'Marija',
  })
  name: string;

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

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: `Card name`,
    example: 'Jane Doe',
  })
  ccFullName: string;

  @Column({ nullable: true, length: 16 })
  @ApiProperty({
    type: String,
    description: `Card number`,
    example: '0123495678012345',
  })
  ccNum: string;

  @Column({ type: Date, nullable: true })
  @ApiProperty({
    type: Date,
    description: `Card expiration date`,
    example: '2024-05-01 00:00:00',
  })
  expDate: Date;

  @Column({ nullable: true })
  @ApiProperty({
    type: Number,
    description: `CVV card number`,
    example: '123 or 1234',
  })
  cvv: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
    description: 'The time and date the payment info is created at',
    example: '2024-05-01 00:00:00',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: Date,
    description: 'The time and date the payment info is updated at',
    example: '2024-05-01 00:00:00',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @ApiProperty({
    type: Date,
    description: 'The time and date the payment info is deleted at',
    example: '2024-05-01 00:00:00',
  })
  deletedAt: Date;

  // This works just for delete from the query builder, and has nothing to do with softRemove
  @OneToOne(() => User, (user) => user.userInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  userId: string;
}
