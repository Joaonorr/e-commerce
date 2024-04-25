import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(201)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get('page/:page?/limit/:limit?')
  @ApiOperation({ summary: 'Get paginated categories' })
  @ApiResponse({ status: 200, description: 'Return paginated categories.' })
  async findAllPaginated(
    @Param('page') page: string = '1',
    @Param('limit') limit: string = '10'
  ) {
    return await this.categoryService.findAllPaginated(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 204, description: 'Category successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);

    if (!category) return { message: 'Category not found' };

    return { message: 'Category deleted successfully' };
  }
}
