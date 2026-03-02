import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Thêm để dùng Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm dòng này để cho phép Frontend gọi API

  app.enableCors({
    origin: "http://localhost:3000", // Thay "*" bằng origin cụ thể của bạn
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

  await app.listen(3001);
}
bootstrap();