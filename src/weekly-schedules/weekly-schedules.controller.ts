import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeeklySchedulesService } from './weekly-schedules.service';
import { CreateWeeklyScheduleDto } from './dto/create-weekly-schedule.dto';
import { UpdateWeeklyScheduleDto } from './dto/update-weekly-schedule.dto';

@Controller('weekly-schedules')
export class WeeklySchedulesController {
  constructor(private readonly weeklySchedulesService: WeeklySchedulesService) {}

  @Post()
  create(@Body() createWeeklyScheduleDto: CreateWeeklyScheduleDto) {
    return this.weeklySchedulesService.create(createWeeklyScheduleDto);
  }

  @Get()
  findAll() {
    return this.weeklySchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklySchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeeklyScheduleDto: UpdateWeeklyScheduleDto) {
    return this.weeklySchedulesService.update(+id, updateWeeklyScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklySchedulesService.remove(+id);
  }
}
