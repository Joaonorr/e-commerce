import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findAllPaginated(page: number, limit: number) {
    return await this.categoryRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return await this.categoryRepository.findOneBy({ name });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) return null;

    this.categoryRepository.merge(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) return null;

    return this.categoryRepository.remove(category);
  }
}
