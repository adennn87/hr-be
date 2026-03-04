import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt'; // Đảm bảo bạn đã inject JwtService
import * as bcrypt from 'bcrypt';
import { RegisterFormValues } from './dto/create-auth.dto';

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
  async register(registerDto: RegisterFormValues) {
    const { 
      email, 
      password, 
      full_name, 
      phoneNumber, 
      gender, 
      dateOfBirth, 
      citizen_Id,
      address, 
    } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
        fullName: full_name, // Đổi tên trường theo Frontend
        phoneNumber,
        gender,
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        citizen_Id, // Đổi tên trường theo Frontend
        address,
        isActive: true, 
        status: 'Active',
      });

      await this.userRepository.save(newUser);

      return { 
        message: 'Đăng ký tài khoản thành công',
        success: true 
      };

    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Thông tin định danh (CCCD hoặc Email) đã tồn tại');
      }
      console.error('Register Error:', error);
      throw new InternalServerErrorException('Lỗi hệ thống khi tạo tài khoản');
    }
  }

  /**
   * Đăng nhập - Giải quyết lỗi TS2339 trong Controller
   */
  async login(email: string, password: string) {
    // 1. Tìm user theo email và lấy các quan hệ cần thiết (như role)
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // 2. Kiểm tra mật khẩu băm
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // 3. Kiểm tra trạng thái tài khoản
    if (user.status !== 'Active') {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    // 4. Tạo JWT payload khớp với cấu trúc Frontend mong đợi
    const payload = { sub: user.id, email: user.email, fullName: user.fullName };
    
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  /**
   * Quên mật khẩu - Giải quyết lỗi TS2339 trong Controller
   */
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống');
    }
    
    // Logic tạo mã OTP và gửi mail sẽ thực hiện tại đây
    return { message: 'Mã xác thực đã được gửi tới email của bạn' };
  }
}