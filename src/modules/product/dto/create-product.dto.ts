import { IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

    @IsOptional()
    slug?: string;

    @IsOptional()
    userId?: number;
}
