import { Module } from '@nestjs/common';
import { WeeklySchedulesService } from './weekly-schedules.service';
import { WeeklySchedulesController } from './weekly-schedules.controller';

@Module({
  controllers: [WeeklySchedulesController],
  providers: [WeeklySchedulesService],
})
export class WeeklySchedulesModule {}
