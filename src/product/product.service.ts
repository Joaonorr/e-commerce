import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {

    const category = await this.categoryRepository.findOneBy({ id: createProductDto.category_id.id });

    if (!category) return null;

    createProductDto.category_id

    const product = this.productRepository.create(createProductDto);

    return await this.productRepository.save(product);  
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = this.productRepository.findOneBy({ id });

    if (!product) return null;

    return product;
  }

  async findAllFil(page: number, limit: number) {
    return await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findAllFilte(page: number, limit: number, category_id: number) {

    page = page || 1;
    limit = limit || 10;

    if (category_id == 0) {
      return await this.productRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    return await this.productRepository.find({
      where: {
        category_id: {
          id: category_id
        } 
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) return null;

    const category = await this.categoryRepository.findOneBy({ id: updateProductDto.category_id.id });

    if (!category) return null;

    this.productRepository.merge(product, updateProductDto);

    return this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
