import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'adendz99',
      password: '',
      database: 'hr_system',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Sử dụng false vì bạn đã có query SQL riêng
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}