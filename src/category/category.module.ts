import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Type } from 'class-transformer';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TypeOrmModule.forFeature([Product])],
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
})
export class CategoryModule {}
