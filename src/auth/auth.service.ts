import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterFormValues } from './dto/create-auth.dto'; // Đảm bảo bạn đã định nghĩa DTO này

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Đăng ký tài khoản mới
   */
  async register(registerDto: any) {
    const { email, password, fullName } = registerDto;

    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống');
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Lưu user mới (Mặc định role_id có thể là 2 cho Employee hoặc tùy logic của bạn)
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      status: 'Active',
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Đăng ký tài khoản thành công',
    };
  }

  /**
   * Đăng nhập
   */
  async login(email: string, pass: string) {
    // 1. Tìm user theo email
    const users = await this.userRepository.findOne({ 
        where: { email },
        relations: ['role'] // Nếu bạn muốn lấy thông tin quyền hạn
    });

    if (!users) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // 2. So khớp mật khẩu
    const isMatch = await bcrypt.compare(pass, users.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // 3. Kiểm tra trạng thái tài khoản
    if (users.is_active !== true) {
      throw new UnauthorizedException('Tài khoản đã bị khóa hoặc chưa kích hoạt');
    }

    // 4. Tạo JWT Payload
    const payload = { 
      sub: users.id, 
      email: users.email,
      role: users.role_id? users.role_id : 2 // Giả sử bạn có bảng role để lấy tên quyền hạn 
    };

    // 5. Trả về đúng format Frontend yêu cầu
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: users.id,
        fullName: users.full_name,
        email: users.email,
      },
    };
  }

  /**
   * Gửi OTP quên mật khẩu (Logic mẫu)
   */
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email không tồn tại');
    }

    // Logic tạo mã OTP và gửi Mail sẽ được thực hiện ở đây
    // Bạn có thể gọi OtpService đã có trong project của mình
    
    return { message: 'Mã xác thực đã được gửi tới email của bạn' };
  }
}