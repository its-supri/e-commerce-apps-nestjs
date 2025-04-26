import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { JwtUser } from 'src/common/class/jwt-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Balance } from './entities/balance.entity';

@Controller('balance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BalanceController {
    constructor(private balanceService: BalanceService) {}

    @Get()
    @Roles('Buyer')
    findAll(): Promise<Balance[]> {
        return this.balanceService.findAll()
    }

    @Post()
    @Roles('Buyer')
    create(
        @Body() createBalanceDto: CreateBalanceDto,
        @Request() jwtData: JwtUser
    ) {
        return this.balanceService.create(createBalanceDto, jwtData.user)
    }
}
