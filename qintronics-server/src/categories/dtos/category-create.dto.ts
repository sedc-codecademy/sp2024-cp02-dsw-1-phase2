import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryCreateDto {
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   type: String,
  //   description: 'Category ID',
  //   example: 'fb767117-e139-4283-8580-01f8138a4ae7',
  // })
  // id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Category name.',
    example: 'Laptops',
  })
  name: string;
}
