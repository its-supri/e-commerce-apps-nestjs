import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { BalanceModule } from './modules/balance/balance.module';
import { OrderModule } from './modules/order/order.module';
import databaseConfig from './database/database.config';
import { KafkaModule } from './kafka/kafka.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    ProductModule,
    BalanceModule,
    OrderModule,
    KafkaModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
