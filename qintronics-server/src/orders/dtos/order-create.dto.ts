import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class OrderCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Customer Street Address',
    example: 'Partizanska 1',
  })
  address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Customer City',
    example: 'Skopje',
  })
  city: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Customer Zip number',
    example: 1000,
  })
  zip: number;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Preferred delivery date of the order',
    example: '2024-09-30',
  })
  deliveryDate: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description:
      'Payment status - true if paid by card, false if paid by cash on delivery',
    example: true,
  })
  isPaid: boolean;
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the user who made the order in UUID format',
    example: '2a7dc9f8-40ca-4d0e-a897-2f6a55ccbd88',
  })
  userId: string;
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    description: 'List of product IDs in UUID format',
    example: ['2a7dc9f8-40ca-4d0e-a897-2f6a55ccbd88'],
  })
  products: string[];
}
