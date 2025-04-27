import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Expose } from "class-transformer";

@ApiSchema({ name: 'User Response', description: 'User response' })
export class UserResponseDto {
    @ApiProperty()
    @Expose()
    username: string;
  
    @ApiProperty()
    @Expose()
    fullname: string;
  
    @ApiProperty()
    @Expose()
    email: string;
}