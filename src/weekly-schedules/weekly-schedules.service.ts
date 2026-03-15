import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkScheduleWeek } from './entities/work_schedule_weeks.entity';
import { WorkScheduleDay } from './entities/work_schedule_days.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { LeaveRequest } from 'src/leave-requests/entities/leave-request.entity';

@Injectable()
export class WorkSchedulesService {
  constructor(
    @InjectRepository(WorkScheduleWeek)
    private weekRepo: Repository<WorkScheduleWeek>,

    @InjectRepository(WorkScheduleDay)
    private dayRepo: Repository<WorkScheduleDay>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(LeaveRequest)
    private leaveRepo: Repository<LeaveRequest>
  ) { }

  async create(dto: CreateWorkScheduleDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const week = this.weekRepo.create({
      user,
      weekStartDate: dto.weekStartDate,
      weekEndDate: dto.weekEndDate,
      days: dto.days,
    });

    return this.weekRepo.save(week);
  }

async findAll() {
  const weeks = await this.weekRepo.find({
    relations: {
      user: true,
      days: true,
    },
    order: {
      weekStartDate: 'DESC',
    },
  });

  const leaves = await this.leaveRepo.find({
    where: {
      status: 'APPROVED',
    },
    relations: ['user'],
  });

  for (const week of weeks) {
    const weekStart = new Date(week.weekStartDate);

    for (const day of week.days) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + (day.dayOfWeek - 1));

      const leave = leaves.find((l) => {
        const leaveStart = new Date(l.startDate);
        const leaveEnd = new Date(l.endDate);

        return (
          l.user.id === week.user.id &&
          date >= leaveStart &&
          date <= leaveEnd
        );
      });

      day['date'] = date;

      if (leave) {
        day['isLeave'] = true;
        day['leaveType'] = leave.type;
        day['leaveReason'] = leave.reason;
      } else {
        day['isLeave'] = false;
      }
    }
  }

  return weeks;
}
  async findOne(id: string) {
    const week = await this.weekRepo.findOne({
      where: { id },
      relations: {
        user: true,
        days: true,
      },
    });

    if (!week) throw new NotFoundException('Schedule not found');

    return week;
  }

  async findByUser(userId: string) {
    return this.weekRepo.find({
      where: {
        user: { id: userId },
      },
      relations: {
        days: true,
      },
      order: {
        weekStartDate: 'DESC',
      },
    });
  }

  async update(id: string, dto: UpdateWorkScheduleDto) {
    const week = await this.weekRepo.findOne({
      where: { id },
      relations: { days: true },
    });

    if (!week) throw new NotFoundException('Schedule not found');

    if (dto.weekStartDate) week.weekStartDate = dto.weekStartDate;
    if (dto.weekEndDate) week.weekEndDate = dto.weekEndDate;

    if (dto.days) {
      await this.dayRepo.delete({ week: { id } });

      const newDays = dto.days.map((d) =>
        this.dayRepo.create({
          ...d,
          week,
        }),
      );

      week.days = newDays;
    }

    return this.weekRepo.save(week);
  }

  async remove(id: string) {
    const week = await this.weekRepo.findOne({ where: { id } });

    if (!week) throw new NotFoundException('Schedule not found');

    return this.weekRepo.remove(week);
  }
}