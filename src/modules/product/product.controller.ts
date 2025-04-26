import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtUser } from 'src/common/class/jwt-user.dto';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    @Roles('Seller')
    findAll() {
        return this.productService.findAll()
    }

    @Post()
    @Roles('Seller')
    create(
        @Body() createProductDto: CreateProductDto,
        @Request() jwtData: JwtUser
    ) {
        return this.productService.create(createProductDto, jwtData.user)
    }

    @Patch(":slug")
    @Roles('Seller')
    update(
        @Request() jwtData: JwtUser,
        @Body() updateProductDto: CreateProductDto,
        @Param('slug') slug: string
    )  {
        return this.productService.update(updateProductDto, slug, jwtData.user);
    }   

    @Delete(":slug")
    @Roles('Seller')
    delete(
        @Request() jwtData: JwtUser,
        @Param('slug') slug: string
    ) {
        return this.productService.delete(slug, jwtData.user)
    }
}
