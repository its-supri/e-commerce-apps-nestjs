import { Expose } from "class-transformer";

export class UserResponseDto {
    @Expose()
    username: string;
  
    @Expose()
    fullname: string;
  
    @Expose()
    email: string;
}