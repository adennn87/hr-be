import { IsArray, IsDateString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WorkDayDto {
  dayOfWeek: number;
  startTime?: string;
  endTime?: string;
  isWorking: boolean;
}

export class CreateWorkScheduleDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  weekStartDate: Date;

  @IsDateString()
  weekEndDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkDayDto)
  days: WorkDayDto[];
}