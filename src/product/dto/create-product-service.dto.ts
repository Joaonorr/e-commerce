import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { CreateProductDto } from "./create-product.dto";
import { UpdateProductDto } from "./update-product.dto";

export class CreateProductServiceDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    sku: string;

    @ApiProperty()
    categoryId: number;

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

    constructor(product: CreateProductDto|UpdateProductDto ) {
        this.name = product.name;
        this.sku = product.sku;
        this.description = product.description;
        this.large_description = product.large_description;
        this.price = product.price;
        this.discount_price = product.discount_price;
        this.discount_percent = product.discount_percent;
        this.is_new = product.is_new;
        this.image_link = product.image_link;
        this.other_image_links = product.other_image_links;
    }
}