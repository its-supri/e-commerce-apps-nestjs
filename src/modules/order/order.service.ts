import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Balance } from '../balance/entities/balance.entity';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkaOrderDto } from './dto/kafka-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private entityManager: EntityManager,
        private readonly kafkaService: KafkaService
    ) {}

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['user', 'product'] });
    }

    async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
        const { quantity, productId } = createOrderDto;
    
        return await this.entityManager.transaction(async (manager) => {
          // 1. Lock and fetch Product
          const product = await manager.findOne(Product, {
            where: { id: productId },
            lock: { mode: 'pessimistic_write' },
          });
          if (!product) {
            throw new NotFoundException(`Product with ID #${productId} not found`);
          }
    
          // 2. Lock and fetch Balance
          const balance = await manager.findOne(Balance, {
            where: { user: { id: user.id } },
            lock: { mode: 'pessimistic_write' },
          });
          if (!balance) {
            throw new NotFoundException('Balance not found for user');
          }
    
          // 3. Validate stock and balance
          if (product.stock < quantity) {
            throw new BadRequestException(`Not enough stock for product #${productId}`);
          }
    
          const totalPrice = quantity * Number(product.price);
    
          if (balance.balance < totalPrice) {
            throw new BadRequestException('Insufficient balance');
          }
    
          // 4. Update product stock
          product.stock -= quantity;
          await manager.save(product);
    
          // 5. Update balance
          balance.balance -= totalPrice;
          await manager.save(balance);
    
          // 6. Create and save order
          const order = manager.create(Order, {
            quantity,
            userId: user.id,
            productId,
          });

          // 7. Send order to Kafka
          const userEmail = await manager.findOne(User, { where: { id: user.id } });
          const kafkaOrder = new KafkaOrderDto();
          kafkaOrder.quantity = quantity;
          kafkaOrder.product = product.name;
          kafkaOrder.userEmail = userEmail.email;
          console.log('Order sent to Kafka:', kafkaOrder);
          await this.kafkaService.sendOrderToKafka(kafkaOrder); 

          // 8. Save order
          return manager.save(order);
        });
    }
}