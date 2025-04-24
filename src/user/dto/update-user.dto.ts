import { IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @MaxLength(100)
    @MinLength(3)
    fullname: string;

    @IsOptional()
    @MinLength(8)
    password: string;

    @IsOptional()
    role: string;
}