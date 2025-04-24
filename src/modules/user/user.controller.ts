import { Body, Controller, Get, Patch, Post, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Post()
    create(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.create(createUserDto)
    }

    @Patch(":username")
    update(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto
    )  {
        return this.userService.update(username, updateUserDto);
    }

    @Delete(":username")
    delete(
        @Param('username') username: string
    ) {
        return this.userService.delete(username)
    }
}
