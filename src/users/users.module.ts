import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đăng ký User Entity
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService], // QUAN TRỌNG: Export TypeOrmModule để module khác dùng được UserRepository
})
export class UsersModule {}