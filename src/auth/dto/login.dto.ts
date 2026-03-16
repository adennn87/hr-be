import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu phải từ 8 ký tự' })
  @Matches(/[A-Z]/, { message: 'Mật khẩu cần ít nhất 1 chữ hoa' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Mật khẩu cần ít nhất 1 ký tự đặc biệt' })
  password: string;
}

export class LoginOtpDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu phải từ 8 ký tự' })
  @Matches(/[A-Z]/, { message: 'Mật khẩu cần ít nhất 1 chữ hoa' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Mật khẩu cần ít nhất 1 ký tự đặc biệt' })
  password: string;

  
  @IsNotEmpty({ message: 'OTP không được để trống' })
  otp: string;
}