import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { WorkScheduleWeek } from 'src/weekly-schedules/entities/work_schedule_weeks.entity';
import { User } from 'src/users/entities/user.entity';
import { AdjustmentType } from './entities/AdjustmentType.entity';
import { UserAdjustment } from './entities/user-adjusments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, WorkScheduleWeek, User, UserAdjustment, AdjustmentType])],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [PayrollService],
})
export class PayrollModule {}
