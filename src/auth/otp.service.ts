import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Otp } from './entities/otp.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Otp) private otpRepo: Repository<Otp>,
    private jwtService: JwtService,
  ) {}

  // Đăng ký: Hash password trước khi lưu (Zero Trust)
  async register(dto: any) {
    const userExists = await this.userRepo.findOneBy({ email: dto.email });
    if (userExists) throw new BadRequestException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return this.userRepo.save(user);
  }

  // Đăng nhập: Kiểm tra password hash
  async login(email: string, pass: string) {
    const user = await this.userRepo.createQueryBuilder('user')
      .addSelect('user.password') // Lấy password để so sánh
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = { sub: user.id, email: user.email, role: user.role_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Quên mật khẩu: Tạo OTP và lưu vào DB
  async forgotPassword(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expired_at = new Date(Date.now() + 5 * 60000); // 5 phút

    await this.otpRepo.save({ email, code, expired_at });
    // Tích hợp gửi Mail tại đây
    return { message: 'Mã OTP đã được gửi' };
  }
}   