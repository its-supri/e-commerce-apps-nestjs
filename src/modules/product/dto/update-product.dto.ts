import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";

@ApiSchema({ name: 'Update Product Request', description: 'Update product request' })
export class UpdateProductDto {
    @ApiProperty({
        description: 'Product name',
        example: 'Product name',
        minimum: 3,
        maximum: 100
    })
    @MaxLength(100)
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Product price',
        example: 100,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    price: number;
    
    @ApiProperty({
        description: 'Product stock',
        example: 100,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    slug?: string;

    @IsOptional()
    userId?: number;
}
