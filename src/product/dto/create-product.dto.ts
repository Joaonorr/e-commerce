import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    sku: string;

    @ApiProperty()
    @IsNumber()
    category_id: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    large_description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    discount_price: number;

    @ApiProperty()
    @IsNumber()
    discount_percent: number;

    @ApiProperty()
    @IsBoolean()
    is_new: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    image_link: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    other_image_links: string;
}