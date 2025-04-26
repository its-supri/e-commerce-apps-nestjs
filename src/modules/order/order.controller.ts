import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtUser } from 'src/common/class/jwt-user.dto';

@Controller('order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Post()
    @Roles('Buyer')
    create(@Body() createOrderDto: CreateOrderDto, @Request() jwtData: JwtUser) {
        return this.orderService.create(createOrderDto, jwtData.user);
    }
}
