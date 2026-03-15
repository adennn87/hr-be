import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveStatusDto } from './dto/update-leave-request.dto';
import { User } from 'src/users/entities/user.entity';
import { WorkScheduleWeek } from 'src/weekly-schedules/entities/work_schedule_weeks.entity';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRepo: Repository<LeaveRequest>,

    @InjectRepository(WorkScheduleWeek)
    private workScheduleWeekRepo: Repository<WorkScheduleWeek>,
  ) { }

  async create(user: User, dto: CreateLeaveRequestDto) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    console.log(start, end);

    if (start > end) {
      throw new BadRequestException('startDate phải nhỏ hơn endDate');
    }

    // check trùng leave
    const conflict = await this.leaveRepo.findOne({
      where: {
        user: { id: user.id },
        startDate: LessThanOrEqual(end),
        endDate: MoreThanOrEqual(start),
      },
    });

    if (conflict) {
      throw new BadRequestException('Đã có đơn nghỉ trong khoảng thời gian này');
    }

    // tìm tất cả schedule tuần liên quan
    const schedules = await this.workScheduleWeekRepo.find({
      where: {
        user: { id: user.id },
        weekStartDate: LessThanOrEqual(end),
        weekEndDate: MoreThanOrEqual(start),
      },
      relations: ['days'],
    });

    if (!schedules.length) {
      throw new BadRequestException('Không có lịch làm trong khoảng thời gian này');
    }

    // kiểm tra từng ngày
    const current = new Date(start);

    while (current <= end) {
      const currentDate = current.toISOString().slice(0, 10);

      const dayOfWeek = current.getDay() === 0 ? 7 : current.getDay();

      const schedule = schedules.find((s) => {
        const start = new Date(s.weekStartDate).toISOString().slice(0, 10);
        const end = new Date(s.weekEndDate).toISOString().slice(0, 10);

        return currentDate >= start && currentDate <= end;
      });

      if (!schedule) {
        throw new BadRequestException(
          `Không có lịch làm ngày ${currentDate}`,
        );
      }

      const day = schedule.days.find((d) => d.dayOfWeek === dayOfWeek);

      if (!day || !day.isWorking) {
        throw new BadRequestException(
          `Ngày ${currentDate} không có lịch làm`,
        );
      }

      current.setDate(current.getDate() + 1);
    }

    const leave = this.leaveRepo.create({
      ...dto,
      user,
    });

    return this.leaveRepo.save(leave);
  }


  async findMyLeaves(userId: string) {
    return this.leaveRepo.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll() {
    return this.leaveRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, dto: UpdateLeaveStatusDto) {
    const leave = await this.leaveRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!leave) throw new NotFoundException('Leave request not found');

    leave.status = dto.status;

    if (dto.rejectReason) {
      leave.rejectReason = dto.rejectReason;
    }

    return this.leaveRepo.save(leave);
  }
}