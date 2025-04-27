import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'KAFKA_CLIENT',
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers: ['localhost:9092'], // Kafka broker URL
                },
                consumer: {
                  groupId: 'ecommerce-consumer-group-test', // Kafka consumer group ID
                },
              },
            },
          ]),
    ],
    providers: [KafkaService],
    exports: [KafkaService, KafkaModule],
})
export class KafkaModule {}
