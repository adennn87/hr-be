import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Department, Position } from 'src/users/entities/user.entity';

export class RegisterFormValues {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu phải từ 8 ký tự' })
  @Matches(/[A-Z]/, { message: 'Mật khẩu cần ít nhất 1 chữ hoa' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Mật khẩu cần ít nhất 1 ký tự đặc biệt' })
  password: string;

  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  full_name: string; // Đã đổi theo Frontend của bạn

  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  citizen_Id?: string;
  department: Department;

  taxCode?: string;

  position: Position;
}