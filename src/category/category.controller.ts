import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
  Optional,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(201)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all categories' })
  // @ApiResponse({ status: 200, description: 'Return all categories.' })
  // async findAll() {
  //   return await this.categoryService.findAll();
  // }

  @Get('filter/')
  @ApiOperation({
    summary: 'Get paginated categories',
  })
  @ApiResponse({ status: 200, description: 'Return paginated categories.' })
  @ApiQuery({ name: 'page', required: false, example: '1' })
  @ApiQuery({ name: 'limit', required: false, example: '10' })
  @ApiQuery({ name: 'attributeOrder', required: false, example: 'id' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC' })
  async findAllPaginated(
    @Query('page')
    page: string = '1',

    @Query('limit')
    limit: string = '10',

    @Query('attributeOrder')
    attributeOrder: string = 'id',

    @Query('order')
    order: string = 'ASC',
  ) {
    return await this.categoryService.findAllFilte(
      +page,
      +limit,
      attributeOrder,
      order,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a category by name' })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOneByName(@Param('name') name: string) {
    return await this.categoryService.findOneByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(+id, updateCategoryDto);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 204, description: 'Category successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const products = await this.productService.findAllFilte(1, 1, +id);

    console.log(products.itemCount);

    if (+products.itemCount > 0) {
      throw new NotFoundException(
        'Category cannot be deleted because it is associated with a product',
      );
    }

    const category = await this.categoryService.remove(+id);

    if (!category) throw new NotFoundException('Category not found');

    return { message: 'Category deleted successfully' };
  }
}
