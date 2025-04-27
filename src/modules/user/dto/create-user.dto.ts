import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

@ApiSchema({ name: 'Create User Request', description: 'Create user request' })
export class CreateUserDto {
    @ApiProperty({
        description: 'Username',
        example: 'username',
        minimum: 3,
        maximum: 50
    })
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(3)
    username: string;
    
    @ApiProperty({
        description: 'Fullname',
        example: 'Fullname',
        minimum: 3,
        maximum: 100
    })
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(3)
    fullname: string;

    @ApiProperty({
        description: 'Password',
        example: 'password',
        minimum: 8
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'Email',
        example: 'email',
        minimum: 8
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    role?: string;
}