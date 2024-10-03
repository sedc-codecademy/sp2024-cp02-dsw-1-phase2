import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/ordersPagination/page-options.dto';
import { OrderQueryDto } from './order-query.dto';

export class GetAllOrdersDto {
  @ApiPropertyOptional({
    type: PageOptionsDto,
    description: 'Pagination options',
  })
  paginationQueries?: PageOptionsDto;

  @ApiPropertyOptional({
    type: OrderQueryDto,
    description: 'Query options',
  })
  queryParams?: OrderQueryDto;
}
