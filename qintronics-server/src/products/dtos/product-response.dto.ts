import { Product } from '../product.entity';
import { ProductCreateDto } from './product-create.dto';

export class ProductResponseDto {
  products: Product[];
  total: number;
  next: boolean;
  prev: boolean;
}
