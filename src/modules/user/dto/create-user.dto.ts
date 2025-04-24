import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    username: string;
    
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    fullname: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    role?: string;
}