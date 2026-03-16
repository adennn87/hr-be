import { IsUUID, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserAdjustmentDto {

  @IsUUID()
  userId: string;

  @IsUUID()
  typeId: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  note?: string;
}