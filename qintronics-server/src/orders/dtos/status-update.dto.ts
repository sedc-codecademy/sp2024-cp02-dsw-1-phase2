import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class StatusUpdateDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'Order Processing Status',
    example: true,
  })
  isTaken?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'Order Delivery Status',
    example: true,
  })
  isDelivered?: boolean;
}
