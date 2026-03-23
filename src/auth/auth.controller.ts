import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Patch, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterFormValues } from './dto/create-auth.dto';
import { LoginDto, LoginOtpDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { log } from 'console';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerDto: RegisterFormValues) {
    return this.authService.register(registerDto);
  }

  @Post('loginOtp')
  @HttpCode(HttpStatus.OK)
  loginOtp(@Body() loginDto: LoginOtpDto) {
    return this.authService.loginOtp(loginDto.email, loginDto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginOtpDto) {
    return this.authService.login(loginDto.email, loginDto.password, loginDto.otp);
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
  
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

}