import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export enum LeaveType {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  UNPAID = 'UNPAID',
  OTHER = 'OTHER',
}

export class CreateLeaveRequestDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsEnum(LeaveType)
  type: LeaveType;

  @IsOptional()
  @IsString()
  reason?: string;
}