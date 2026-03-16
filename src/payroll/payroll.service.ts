import { InjectRepository } from "@nestjs/typeorm";
import { Payroll } from "./entities/payroll.entity";
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { WorkScheduleWeek } from "src/weekly-schedules/entities/work_schedule_weeks.entity";
import { Between } from 'typeorm';
import dayjs from 'dayjs';
import { CreateAdjustmentTypeDto } from "./dto/create-adjustment-type.dto";
import { AdjustmentType } from "./entities/AdjustmentType.entity";
import { CreateUserAdjustmentDto } from "./dto/CreateUserAdjustmentDto";
import { UserAdjustment } from "./entities/user-adjusments.entity";

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepo: Repository<Payroll>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(WorkScheduleWeek)
    private workScheduleWeekRepo: Repository<WorkScheduleWeek>,

    @InjectRepository(AdjustmentType)
    private adjustmentTypeRepo: Repository<AdjustmentType>,

    @InjectRepository(UserAdjustment)
    private userAdjustmentRepo: Repository<UserAdjustment>
  ) { }


  async createAdjustmentType(dto: CreateAdjustmentTypeDto) {
    const type = this.adjustmentTypeRepo.create(dto);
    return this.adjustmentTypeRepo.save(type);
  }

  async addAdjustment(dto: CreateUserAdjustmentDto) {

  const user = await this.userRepo.findOne({
    where: { id: dto.userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const type = await this.adjustmentTypeRepo.findOne({
    where: { id: dto.typeId },
  });

  if (!type) {
    throw new NotFoundException('Adjustment type not found');
  }

  const adjustment = this.userAdjustmentRepo.create({
    user,
    type,
    amount: dto.amount,
    note: dto.note,
  });

  return this.userAdjustmentRepo.save(adjustment);
}


  async getPayrollById(id: string) {
    const payroll = await this.payrollRepo.findOne({
      where: { id },
      relations: [
        'user',
        'adjustments',
        'adjustments.type',
      ],
    });

    if (!payroll) {
      throw new NotFoundException('Payroll not found');
    }

    return payroll;
  }

  async generatePayroll(month: string) {

    const year = new Date().getFullYear();

    const startMonth = dayjs(`${year}-${month}-01`).startOf('month').toDate();
    const endMonth = dayjs(`${year}-${month}-01`).endOf('month').toDate();

    // xoá payroll cũ
    await this.payrollRepo.delete({ month });

    const users = await this.userRepo.find({
      relations: ['adjustments', 'adjustments.type'],
    });

    for (const user of users) {

      const weeks = await this.workScheduleWeekRepo.find({
        where: {
          user: { id: user.id },
          status: 'APPROVED',
          weekStartDate: LessThanOrEqual(endMonth),
          weekEndDate: MoreThanOrEqual(startMonth),
        },
        relations: ['days'],
      });

      let workingDays = 0;

      weeks.forEach((week) => {
        week.days.forEach((day) => {
          if (day.isWorking) workingDays++;
        });
      });

      const salaryPerDay = user.salaryPerDay || 0;
      const baseSalary = workingDays * salaryPerDay;

      let allowance = 0;
      let deduction = 0;

      if (user.adjustments) {
        user.adjustments.forEach((adj) => {

          if (!adj.isActive) return;

          if (adj.type.type === 'ADD') {
            allowance += Number(adj.amount);
          }

          if (adj.type.type === 'DEDUCT') {
            deduction += Number(adj.amount);
          }

        });
      }

      const finalSalary = baseSalary + allowance - deduction;

      await this.payrollRepo.save({
        user,
        month,
        workingDays,
        salaryPerDay,
        baseSalary,
        bonus: allowance,
        deduction,
        finalSalary,
      });

    }

    return { message: 'Payroll generated successfully' };
  }

  async getPayrollByMonth(month: string) {

  const payrolls = await this.payrollRepo.find({
    where: { month },
    relations: [
      'user',
      'user.department',
      'user.adjustments',
      'user.adjustments.type',
    ],
  });

  return payrolls.map((payroll) => {

    let allowance = 0;
    let deduction = 0;

    payroll.user.adjustments?.forEach((adj) => {

      if (!adj.isActive) return;

      if (adj.type.type === 'ADD') {
        allowance += Number(adj.amount);
      }

      if (adj.type.type === 'DEDUCT') {
        deduction += Number(adj.amount);
      }

    });

    return {
      payrollId: payroll.id,
      month: payroll.month,

      user: {
        id: payroll.user.id,
        name: payroll.user.fullName,
        email: payroll.user.email,
        department: payroll.user.department?.name,
      },

      workingDays: payroll.workingDays,
      salaryPerDay: payroll.salaryPerDay,

      baseSalary: payroll.baseSalary,

      allowance,
      deduction,

      finalSalary: payroll.finalSalary,

      adjustments: payroll.user.adjustments,
    };

  });
}

async getUserPayroll(userId: string, month: string) {

  const payroll = await this.payrollRepo.findOne({
    where: {
      user: { id: userId },
      month,
    },
    relations: [
      'user',
      'user.department',
      'user.adjustments',
      'user.adjustments.type',
    ],
  });

  if (!payroll) {
    throw new NotFoundException('Payroll not found');
  }

  let allowance = 0;
  let deduction = 0;

  payroll.user.adjustments?.forEach((adj) => {

    if (!adj.isActive) return;

      if (adj.type.type === 'ADD') {
        allowance += Number(adj.amount);
      }

      if (adj.type.type === 'DEDUCT') {
        deduction += Number(adj.amount);
      }

  });

  return {
    month: payroll.month,

    user: {
      id: payroll.user.id,
      name: payroll.user.fullName,
      email: payroll.user.email,
      department: payroll.user.department?.name,
    },

    workingDays: payroll.workingDays,
    salaryPerDay: payroll.salaryPerDay,

    baseSalary: payroll.baseSalary,

    allowance,
    deduction,

    finalSalary: payroll.finalSalary,

    adjustments: payroll.user.adjustments.map((adj) => ({
      id: adj.id,
      name: adj.type.name,
      category: adj.type.type,
      amount: adj.amount,
      note: adj.note,
    })),
  };
}

}