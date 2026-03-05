import { PartialType } from '@nestjs/swagger';
import { CreateWeeklyScheduleDto } from './create-weekly-schedule.dto';

export class UpdateWeeklyScheduleDto extends PartialType(CreateWeeklyScheduleDto) {}
