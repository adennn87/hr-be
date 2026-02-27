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

  // Đăng ký tài khoản (Mã hóa mật khẩu ngay lập tức)
  async register(dto: any) {
    const userExists = await this.userRepo.findOneBy({ email: dto.email });
    if (userExists) throw new BadRequestException('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return this.userRepo.save(user);
  }

  // Đăng nhập (Zero Trust: Kiểm tra is_active, hash password)
  async login(email: string, pass: string) {
    const user = await this.userRepo.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .andWhere('user.is_active = :active', { active: true })
      .getOne();

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }

    const payload = { sub: user.id, email: user.email, role: user.role_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Quên mật khẩu: Tạo và lưu mã OTP
  async forgotPassword(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new BadRequestException('Email không tồn tại');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expired_at = new Date(Date.now() + 10 * 60000); // 10 phút

    await this.otpRepo.save({ email, code, expired_at });
    // Ở đây sẽ tích hợp thêm MailService để gửi code
    return { message: 'Mã OTP đã được gửi' };
  }
}