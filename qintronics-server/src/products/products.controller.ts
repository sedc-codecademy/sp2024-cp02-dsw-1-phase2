import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dtos/product-response.dto';
import { Product } from './product.entity';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductUpdateDto } from './dtos/product-update.dto';
import { ProductQueryDto } from './dtos/product-query.dto';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ========== GET ALL PRODUCTS ==========
  @Get('/')
  @ApiOperation({ summary: 'Get Products' })
  @ApiOkResponse({
    description: 'Retrieved all products.',
    type: [Product],
  })
  @ApiQuery({
    type: String,
    name: 'name',
    description: 'Product Name',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'brand',
    description: 'Product Brand',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'categoryName',
    description: 'Category Name',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'page',
    description: 'Page Number',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    description: 'Page Size',
    required: false,
  })
  getProducts(@Query() query: ProductQueryDto): Promise<ProductResponseDto[]> {
    return this.productsService.getProducts(query);
  }

  // ========== GET PRODUCT BY ID ==========
  @Get('/:id')
  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiOkResponse({
    description: 'Retrieved product by ID.',
    type: Product,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID',
  })
  getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productsService.getProductById(id);
  }

  // ========== CREATE PRODUCT ==========
  @Post('/')
  @ApiOperation({ summary: 'Create Product' })
  @ApiOkResponse({
    description: 'Product created successfully.',
    type: Product,
  })
  @ApiBody({
    type: ProductCreateDto,
  })
  createProduct(@Body() body: ProductCreateDto): Promise<ProductResponseDto> {
    return this.productsService.createProduct(body);
  }

  // ========== UPDATE PRODUCT ==========
  @Put('/:id')
  @ApiOperation({ summary: 'Update Product' })
  @ApiOkResponse({
    description: 'Product updated successfully.',
    type: Product,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID',
  })
  @ApiBody({
    type: ProductUpdateDto,
  })
  updateProduct(
    @Param('id') id: string,
    @Body() body: ProductUpdateDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.updateProduct(id, body);
  }

  // ========== DELETE PRODUCT ==========
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID',
  })
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
