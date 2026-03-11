import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';
import { WorkSchedulesService } from './weekly-schedules.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('weekly-schedules')
export class WeeklySchedulesController {
  constructor(private readonly weeklySchedulesService: WorkSchedulesService) {}

  @RequireFunction('WEEKLY_SCHEDULE_CREATE')
  @Post()
  create(@Body() createWeeklyScheduleDto: CreateWorkScheduleDto) {
    return this.weeklySchedulesService.create(createWeeklyScheduleDto);
  }

  @RequireFunction('WEEKLY_SCHEDULE_VIEW')
  @Get()
  findAll() {
    return this.weeklySchedulesService.findAll();
  }

  @RequireFunction('WEEKLY_SCHEDULE_DETAIL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklySchedulesService.findOne(id);
  }

  @RequireFunction('WEEKLY_SCHEDULE_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeeklyScheduleDto: UpdateWorkScheduleDto) {
    return this.weeklySchedulesService.update(id, updateWeeklyScheduleDto);
  }

  @RequireFunction('WEEKLY_SCHEDULE_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklySchedulesService.remove(id);
  }
}