import { Module } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { TimekeepingController } from './timekeeping.controller';

@Module({
  controllers: [TimekeepingController],
  providers: [TimekeepingService],
})
export class TimekeepingModule {}
