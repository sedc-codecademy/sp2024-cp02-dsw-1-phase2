import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusUpdateDto } from './status-update.dto';

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
}
