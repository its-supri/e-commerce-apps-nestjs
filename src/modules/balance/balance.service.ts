import { Injectable, NotFoundException } from '@nestjs/common';
import { Balance } from './entities/balance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { JwtUser } from 'src/common/class/jwt-user.dto';

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>
    ) {}

    async findAll(): Promise<Balance[]> {
        return this.balanceRepository.find();
    }

    async create(createBalanceDto: CreateBalanceDto, jwtData: JwtUser): Promise<Balance> {
        const { balance } = createBalanceDto;
        const userBalance = await this.balanceRepository.findOne({
            where: { user: { id: jwtData.id } },
            relations: ['user']
        });
        if (!userBalance) {
            throw new NotFoundException('Balance not found or you do not have permission to update it');
        }
        // add old balance with new balance
        userBalance.balance += balance;
        await this.balanceRepository.save(userBalance);
        return userBalance;        
    }
}
