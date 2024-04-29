import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/category.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );

    if (!category) throw new NotFoundException('Category not found');

    return await this.productService.create(createProductDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all products' })
  // @ApiResponse({ status: 200, description: 'Return all products.' })
  // async findAll() {
  //   return await this.productService.findAll();
  // }

  @Get('filter/')
  @ApiOperation({
    summary: 'Get paginated products',
    description:
      'If the query parameter "categoryId" is 0 or not provided, this endpoint will return all products. If a specific "categoryId" is provided, it will return the products within that category.',
  })
  @ApiResponse({ status: 200, description: 'Return paginated products.' })
  @ApiQuery({ name: 'page', required: false, example: '1' })
  @ApiQuery({ name: 'limit', required: false, example: '10' })
  @ApiQuery({ name: 'categoryId', required: false, example: '0' })
  async findAllPaginated(
    @Query('page')
    page: string = '1',

    @Query('limit')
    limit: string = '10',

    @Query('categoryId')
    categoryId: string = '0',
  ) {
    return await this.productService.findAllFilte(+page, +limit, +categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    console.log(product);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        +updateProductDto.categoryId,
      );
      if (!category) throw new NotFoundException('Category not found');
    }

    const product = await this.productService.update(+id, updateProductDto);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id') id: number) {
    const product = await this.productService.remove(id);

    if (!product) throw new NotFoundException('Product not found');

    return { message: 'Product deleted successfully' };
  }
}
