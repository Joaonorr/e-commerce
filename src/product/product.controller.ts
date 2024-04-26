import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/category.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  async create(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(createProductDto.category_id.id);

    if (!category) return { message: 'Category not found' };

    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('page/:page?/limit/:limit?/category/:category_id?')
  @ApiOperation({ summary: 'Get paginated products' })
  @ApiResponse({ status: 200, description: 'Return paginated products.' })
  async findAllPaginated(
    @Param('page') page: string = '1',
    @Param('limit') limit: string = '10',
    @Param('category_id') category_id: string = '0'
  ) {
    return await this.productService.findAllFilte(+page, +limit, +category_id);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: number) {
    const product = this.productService.findOne(id);

    if (!product) return { message: 'Product not found' };

    return product;
  }

@Patch(':id')
@ApiOperation({ summary: 'Update a product' })
@ApiResponse({ status: 200, description: 'Product successfully updated.' })
@ApiResponse({ status: 404, description: 'Product not found.' })
async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {

  if (updateProductDto.category_id) {
    const category = await this.categoryService.findOne(updateProductDto.category_id.id);
    if (!category) return { message: 'Category not found' };
  }

  const product = await this.productService.update(+id, updateProductDto);

  if (!product) return { message: 'Product not found' };

  return product;
}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: number) {
    const product = this.productService.remove(id);

    if (!product) return { message: 'Product not found' };

    return { message: 'Product deleted successfully' };
  }
}
