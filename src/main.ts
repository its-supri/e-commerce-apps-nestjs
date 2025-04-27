import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('The E-commerce API description')
  .setVersion('1.0')
  // .addTag('cats')
  .addServer(`http://localhost:${configService.get('PORT', 3000)}`, 'Development Server')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    },
  )
  .addGlobalResponse({
    status: 500,
    description: 'Internal server error',
  })
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
