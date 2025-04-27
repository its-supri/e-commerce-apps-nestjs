import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS,
        },
    });

  @MessagePattern('order.created') // Listen to 'order.created' Kafka topic
  async handleOrderCreated(@Payload() message: any) {
    this.logger.log('Order received from Kafka:');
    this.logger.log(message);

    const { quantity, product, userEmail } = message;

    const emailContent = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
    `;

    try {
      await this.transporter.sendMail({
        from: 'no-reply@ecommerce-app.com',
        to: userEmail,
        subject: 'Your Order Confirmation',
        html: emailContent,
      });

      this.logger.log(`Email sent successfully to ${userEmail}`);
    } catch (error) {
      this.logger.error('Failed to send email', error);
    }
  }
}
