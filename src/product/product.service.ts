import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { CreateProductServiceDto } from './dto/create-product-service.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {

    console.log(createProductDto.categoryId);

    const category = await this.categoryRepository.findOneBy({ id: +createProductDto.categoryId });

    const _product = new CreateProductServiceDto(createProductDto);

    _product.categoryId = category.id;

    const product = this.productRepository.create(_product);

    return await this.productRepository.save(product);  
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    console.log(product + "service");

    if (!product) return null;

    return product;
  }

  async findAllFil(page: number, limit: number) {
    return await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findAllFilte(page: number, limit: number, categoryId: number) {
    page = page || 1;
    limit = limit || 10;
  
    const queryBuilder = this.productRepository.createQueryBuilder('product');
  
    // queryBuilder.leftJoinAndSelect('product.categoryId', 'category');
  
    if (categoryId != 0) {
      queryBuilder.where('product.categoryId = :categoryId', { categoryId });
    }
  
    return await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findAllByCategory(category_id: number) {
    const category = await this.categoryRepository.findOneBy({ id: category_id });

    if (!category) return null;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder.where('product.category_id = :category_id', { category_id });

    return await queryBuilder.getMany();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) return null;

    const category = await this.categoryRepository.findOneBy({ id: updateProductDto.categoryId });

    if (!category) return null;

    const _product = new CreateProductServiceDto(updateProductDto);

    _product.categoryId = category.id

    this.productRepository.merge(product, _product);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) return null;

    return this.productRepository.remove(product);
  }
}
