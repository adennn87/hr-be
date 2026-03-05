import { Injectable } from '@nestjs/common';
import { CreateWeeklyScheduleDto } from './dto/create-weekly-schedule.dto';
import { UpdateWeeklyScheduleDto } from './dto/update-weekly-schedule.dto';

@Injectable()
export class WeeklySchedulesService {
  create(createWeeklyScheduleDto: CreateWeeklyScheduleDto) {
    return 'This action adds a new weeklySchedule';
  }

  findAll() {
    return `This action returns all weeklySchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weeklySchedule`;
  }

  update(id: number, updateWeeklyScheduleDto: UpdateWeeklyScheduleDto) {
    return `This action updates a #${id} weeklySchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} weeklySchedule`;
  }
}
