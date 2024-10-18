import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Konfigurasi Swagger
  const options = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users') // Tag yang dapat ditambahkan
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // URL Swagger UI adalah http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
