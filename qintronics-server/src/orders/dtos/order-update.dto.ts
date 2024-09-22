import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StatusUpdateDto } from './status-update.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderUpdateDto extends StatusUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Customer Street Address',
    example: 'Partizanska 1',
  })
  address?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Customer City',
    example: 'Skopje',
  })
  city?: string;
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Customer Zip number',
    example: 1000,
  })
  zip?: number;
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
    description: 'Preferred delivery date of the order',
    example: '2024-09-30',
  })
  deliveryDate?: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description:
      'Payment status - true if paid by card, false if paid by cash on delivery',
    example: true,
  })
  isPaid?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'Order Canceling Status',
    example: true,
  })
  isCancelled?: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  @ApiProperty({
    type: [String],
    description: 'List of product IDs in UUID format',
    example: ['2a7dc9f8-40ca-4d0e-a897-2f6a55ccbd88'],
  })
  products?: string[];
}
