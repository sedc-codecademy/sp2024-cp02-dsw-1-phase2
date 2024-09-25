import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  categoryName?: string;

  @IsInt()
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @IsOptional()
  pageSize?: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(['name', 'price'])
  sortBy?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort?: 'ASC' | 'DESC';
}
