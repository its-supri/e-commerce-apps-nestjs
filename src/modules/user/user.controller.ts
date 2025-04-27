import { Body, Controller, Get, Patch, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @Roles('Admin')
    findAll() {
        return this.userService.findAll()
    }

    @Post()
    @Roles('Admin', 'Seller', 'Buyer')
    create(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.create(createUserDto)
    }

    @Patch(":username")
    @Roles('Admin')
    update(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto
    )  {
        return this.userService.update(username, updateUserDto);
    }

    @Delete(":username")
    @Roles('Admin')
    delete(
        @Param('username') username: string
    ) {
        return this.userService.delete(username)
    }
}
