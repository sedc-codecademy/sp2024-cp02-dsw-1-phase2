import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { CategoryResponseDto } from './dtos/category-response.dto';
import { CategoryUpdateDto } from './dtos/category-update.dto';
import * as categoriesData from '../data/categories.json';
import * as productsData from '../data/products.json';
import { Product } from 'src/products/product.entity';
import { CategoryQueryDto } from './dtos/category-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCategories({
    name,
  }: CategoryQueryDto): Promise<CategoryResponseDto[]> {
    let whereQuery = {} satisfies FindOptionsWhere<Category>;

    if (name) {
      whereQuery = {
        ...whereQuery,
        name: ILike(name),
      };
    }

    return this.categoryRepository.find({
      where: whereQuery,
      relations: ['products'],
    });
  }

  async getCategoryById(id: string): Promise<CategoryResponseDto> {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  async createCategory(body: CategoryCreateDto): Promise<CategoryResponseDto> {
    const newCategory = this.categoryRepository.create(body);
    return this.categoryRepository.save(newCategory);
  }

  async backfillCategories(): Promise<void> {
    await this.productRepository.delete({});
    await this.categoryRepository.delete({});
    for (const category of categoriesData) {
      const newCategory = this.categoryRepository.create(category);
      await this.categoryRepository.save(newCategory);
    }

    const newProducts = this.productRepository.create(
      productsData as DeepPartial<Product[]>,
    );

    await this.productRepository.save(newProducts);
  }

  async updateCategory(
    id: string,
    body: CategoryUpdateDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOneByOrFail({ id });
    const updatedCategory = this.categoryRepository.merge(category, body);
    return this.categoryRepository.save(updatedCategory);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new Error('Category not found!');
    }

    if (category.products.length > 0) {
      throw new Error('Cannot delete category with associated products!');
    }

    await this.categoryRepository.remove(category);
  }
}
