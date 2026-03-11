import { Injectable, ConflictException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt'; // Đảm bảo bạn đã inject JwtService
import * as bcrypt from 'bcrypt';
import { RegisterFormValues } from './dto/create-auth.dto';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RoleFunction } from 'src/roles/entities/role_function.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    private readonly mailService: MailerService,
    @InjectRepository(RoleFunction)
    private readonly roleFunctionRepo: Repository<RoleFunction>,
  ) { }

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
      department,
      position,
      taxCode
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
        department,
        position,
        taxCode,
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
  const user = await this.userRepository.findOne({
    where: { email },
    relations: ['role'], // nếu user có relation role
  });

  if (!user) {
    throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
  }

  if (user.status !== 'Active') {
    throw new UnauthorizedException('Tài khoản đã bị khóa');
  }

  const roleFunctions = await this.roleFunctionRepo
    .createQueryBuilder('rf')
    .leftJoinAndSelect('rf.function', 'f')
    .where('rf.role_id = :roleId', { roleId: user.role.id })
    .getMany();

  const permissions = roleFunctions.map((rf) => rf.function.name);

  // JWT payload
  const payload = {
    sub: user.id,
    email: user.email,
    roleId: user.role.id,
    permissions,
  };

  return {
    accessToken: await this.jwtService.signAsync(payload),
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roleId: user.role.id,
      permissions,
    },
  };
}

  /**
   * Quên mật khẩu - Giải quyết lỗi TS2339 trong Controller
   */
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống');
    }
    const otp = this.generateOtp();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 1);
    await this.passwordResetTokenRepository.update(
      { user: { id: user.id }, used: false },
      { used: true },
    );
    const token = this.passwordResetTokenRepository.create({
      user,
      otp,
      expiresAt,
      used: false,
    });
    await this.passwordResetTokenRepository.save(token);
    await this.mailService.sendResetPasswordEmail(user.email, otp);
    return {
      message: 'Mã xác thực đã được gửi tới email của bạn',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { email, otp, newPassword } = dto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Email không tồn tại');
    }

    const token = await this.passwordResetTokenRepository.findOne({
      where: {
        user: { id: user.id },
        otp,
        used: false,
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });

    if (!token) {
      throw new BadRequestException('OTP không hợp lệ');
    }

    if (token.expiresAt < new Date()) {
      throw new BadRequestException('OTP đã hết hạn');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    token.used = true;

    await this.userRepository.save(user);
    await this.passwordResetTokenRepository.save(token);

    return {
      message: 'Đổi mật khẩu thành công',
    };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}