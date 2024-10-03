import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SortingOrder } from 'src/common/enums/sorting.enum';

export class OrderQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'List orders of a user by providing user email',
    example: 'johndoe@mail.com',
  })
  userMail?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    type: Number,
    description: 'Get order by order number',
    example: 15,
  })
  orderNumber?: number;

  @IsOptional()
  @IsEnum(SortingOrder)
  @ApiPropertyOptional({
    description: 'Sort orders by total price',
    enum: SortingOrder,
    enumName: 'sortingOrder',
  })
  sortTotal?: SortingOrder;

  @IsOptional()
  @IsEnum(SortingOrder)
  @ApiPropertyOptional({
    description: 'Sort orders by preferred delivery date',
    enum: SortingOrder,
    enumName: 'sortingOrder',
  })
  sortDelDate?: SortingOrder;

  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Filter orders by delivery status',
    example: false,
  })
  isDelivered?: boolean;

  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Filter orders by processing status',
    example: false,
  })
  isTaken?: boolean;

  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Filter orders by active status',
    example: false,
  })
  isCanceled?: boolean;

  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Filter orders by payment status',
    example: false,
  })
  isPaid?: boolean;
}
