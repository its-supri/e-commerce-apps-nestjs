import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

@ApiSchema({ name: 'Create Balance Request', description: 'Create balance request' })
export class CreateBalanceDto {
    @ApiProperty({
        description: 'Balance amount',
        example: 100,
        minimum: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    balance: number;
}