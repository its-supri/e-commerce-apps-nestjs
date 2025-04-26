import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateBalanceDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    balance: number;
}