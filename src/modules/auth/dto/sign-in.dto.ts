import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// @ApiSchema({ name: 'SignInRequest', description: 'Sign in request' })
export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}