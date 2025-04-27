import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

@ApiSchema({ name: 'Create Order Request', description: 'Create order request' })
export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    productId: number;

    @IsOptional()
    userId?: number;
}