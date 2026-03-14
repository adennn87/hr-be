import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Thêm để dùng Swagger
import { seedFunctions } from './database/seeds/funcions.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm dòng này để cho phép Frontend gọi API

  app.enableCors({
    origin: true,
    credentials: true
  });

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Đây là tài liệu API của ứng dụng')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const dataSource = app.get(DataSource);
  await seedFunctions(dataSource);

  await app.listen(3001);
}
bootstrap();