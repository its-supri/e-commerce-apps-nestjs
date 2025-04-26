import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    productId: number;

    @IsOptional()
    userId?: number;
}