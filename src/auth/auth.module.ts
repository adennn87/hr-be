import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from 'src/mailer/mailer.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleFunction } from 'src/roles/entities/role_function.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RoleFunction]), // Cung cấp RoleFunctionRepository
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule, // Cung cấp UserRepository
    JwtModule.registerAsync({ // Cung cấp JwtService
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }