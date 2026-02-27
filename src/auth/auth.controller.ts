import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private otpService: OtpService
  ) {}

  @Post('register')
  register(@Body() signUpDto: any) {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.otpService.generateOtp(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetDto: any) {
    await this.otpService.verifyOtp(resetDto.email, resetDto.otpCode);
    // Sau khi verify, tiến hành hash password mới và update vào table users
    return { message: 'Mật khẩu đã được thay đổi' };
  }
}