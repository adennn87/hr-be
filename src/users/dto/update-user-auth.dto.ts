import { PartialType } from '@nestjs/swagger';
import { RegisterFormValues } from '../../auth/dto/create-auth.dto';
import { Position } from '../entities/user.entity';

export class UpdateUserAuthDto {
    fullName: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    citizen_Id?: string;
    department: string;
    roleId: string;
    status: string;
    salaryPerDay: number;
    taxCode?: string;
    position: Position;
}
