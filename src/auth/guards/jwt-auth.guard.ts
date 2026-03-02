// src/auth/guards/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Ghi đè phương thức này để xử lý lỗi tùy chỉnh nếu cần
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Phiên làm việc hết hạn hoặc không hợp lệ');
    }
    return user;
  }
}