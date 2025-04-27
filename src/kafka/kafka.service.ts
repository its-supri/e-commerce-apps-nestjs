import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
    constructor(
        @Inject('KAFKA_CLIENT')
        private readonly kafkaClient: ClientKafka,
      ) {}
    
      // Kafka producer - Send message to Kafka topic
      sendOrderToKafka(orderData: any) {
        const topic = 'order.created'; // Topic for new orders
        this.kafkaClient.emit(topic, orderData); // Emits order data to Kafka topic
      }
}
