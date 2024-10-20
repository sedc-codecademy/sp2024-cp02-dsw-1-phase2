import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BasicUserResponse } from 'src/users/dtos/basic-user-response.dto';
import {
  OrderReturnDto,
  ProductsAndQuantityReturnDto,
} from './order-return.dto';
import { PageMetaDto } from 'src/common/ordersPagination/page-meta.dto';

export class QueryOrderReturnDto extends OrderReturnDto {
  @Expose()
  @Type(() => BasicUserResponse)
  @ApiProperty({
    type: BasicUserResponse,
    description: 'User who made the order',
  })
  user: BasicUserResponse;

  @Expose()
  @Type(() => ProductsAndQuantityReturnDto)
  productsAndQuantity: ProductsAndQuantityReturnDto[];
}

export class SwaggerOrderReturnDto {
  @ApiProperty({
    type: [QueryOrderReturnDto],
    description: 'Orders successfully retrieved',
  })
  data: QueryOrderReturnDto[];
  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}
