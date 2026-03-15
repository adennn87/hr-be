import { Module } from '@nestjs/common';
import { WeeklySchedulesController } from './weekly-schedules.controller';
import { WorkSchedulesService } from './weekly-schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkScheduleWeek } from './entities/work_schedule_weeks.entity';
import { WorkScheduleDay } from './entities/work_schedule_days.entity';
import { User } from 'src/users/entities/user.entity';
import { LeaveRequest } from 'src/leave-requests/entities/leave-request.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WorkScheduleWeek, WorkScheduleDay, User, LeaveRequest])],
  controllers: [WeeklySchedulesController],
  providers: [WorkSchedulesService],
  exports: [WorkSchedulesService]
})
export class WeeklySchedulesModule {}
