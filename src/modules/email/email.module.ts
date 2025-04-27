import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
