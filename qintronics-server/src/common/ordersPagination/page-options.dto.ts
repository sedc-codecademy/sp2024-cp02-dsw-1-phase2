import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SortingOrder } from '../enums/sorting.enum';

export class PageOptionsDto {
  @IsOptional()
  @IsEnum(SortingOrder)
  @ApiPropertyOptional({
    enum: SortingOrder,
    default: SortingOrder.ASC,
    description: 'Sorting order of paginated items',
  })
  readonly order?: SortingOrder = SortingOrder.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Current page in pagination',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
    description: 'Number of items shown per page in pagination',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly perPage?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }
}
