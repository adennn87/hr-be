// src/auth/guards/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log("user", user)
    if (err || !user) {
      throw err || new UnauthorizedException('Phiên làm việc hết hạn hoặc không hợp lệ');
    }
    return user;
  }
}