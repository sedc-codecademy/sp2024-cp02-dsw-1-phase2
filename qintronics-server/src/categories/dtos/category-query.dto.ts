import { IsOptional, IsString } from 'class-validator';

export class CategoryQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
