import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsOptional, MaxLength, MinLength } from "class-validator";

@ApiSchema({ name: 'Update User Request', description: 'Update user request' })
export class UpdateUserDto {
    @ApiProperty({
        description: 'Fullname',
        example: 'Fullname',
        minimum: 3,
        maximum: 100
    })
    @IsOptional()
    @MaxLength(100)
    @MinLength(3)
    fullname: string;

    @ApiProperty({
        description: 'Password',
        example: 'password',
        minimum: 8
    })
    @IsOptional()
    @MinLength(8)
    password: string;

    @IsOptional()
    role?: string;
}