import { InjectRepository } from "@nestjs/typeorm";
import { Payroll } from "./entities/payroll.entity";
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { WorkScheduleWeek } from "src/weekly-schedules/entities/work_schedule_weeks.entity";
import { Between } from 'typeorm';
import dayjs from 'dayjs';
import { CreateAdjustmentTypeDto } from "./dto/create-adjustment-type.dto";
import { AdjustmentType } from "./entities/AdjustmentType.entity";
import { CreateUserAdjustmentDto } from "./dto/CreateUserAdjustmentDto";
import { UserAdjustment } from "./entities/user-adjusments.entity";
import { LeaveRequest } from "src/leave-requests/entities/leave-request.entity";
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { get } from "http";

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
    private userAdjustmentRepo: Repository<UserAdjustment>,

    @InjectRepository(LeaveRequest)
    private leaveRepo: Repository<LeaveRequest>
  ) { }


  async createAdjustmentType(dto: CreateAdjustmentTypeDto) {
    const type = this.adjustmentTypeRepo.create(dto);
    return this.adjustmentTypeRepo.save(type);
  }

  async getAdjustmentType(){
    const adjustmentType = await this.adjustmentTypeRepo.find()
    return adjustmentType
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

  // async generatePayroll(month: string) {

  //   const year = new Date().getFullYear();

  //   const startMonth = dayjs(`${year}-${month}-01`).startOf('month').toDate();
  //   const endMonth = dayjs(`${year}-${month}-01`).endOf('month').toDate();

  //   // xoá payroll cũ
  //   await this.payrollRepo.delete({ month });

  //   const users = await this.userRepo.find({
  //     relations: ['adjustments', 'adjustments.type'],
  //   });

  //   for (const user of users) {

  //     const weeks = await this.workScheduleWeekRepo.find({
  //       where: {
  //         user: { id: user.id },
  //         status: 'APPROVED',
  //         weekStartDate: LessThanOrEqual(endMonth),
  //         weekEndDate: MoreThanOrEqual(startMonth),
  //       },
  //       relations: ['days'],
  //     });

  //     let workingDays = 0;

  //     weeks.forEach((week) => {
  //       week.days.forEach((day) => {
  //         if (day.isWorking) workingDays++;
  //       });
  //     });

  //     // tìm leave trong tháng
  //     const leaves = await this.leaveRepo
  //       .createQueryBuilder('leave')
  //       .leftJoin('leave.user', 'user')
  //       .where('user.id = :userId', { userId: user.id })
  //       .andWhere('leave.status = :status', { status: 'APPROVED' })
  //       .andWhere('leave.startDate <= :endMonth', { endMonth })
  //       .andWhere('leave.endDate >= :startMonth', { startMonth })
  //       .getMany();

  //     let leaveDays = 0;

  //     leaves.forEach((leave) => {

  //       const start = dayjs(leave.startDate);
  //       const end = dayjs(leave.endDate);

  //       const days = end.diff(start, 'day') + 1;

  //       leaveDays += days;

  //     });

  //     // trừ ngày nghỉ
  //     workingDays = workingDays - leaveDays;

  //     if (workingDays < 0) {
  //       workingDays = 0;
  //     }

  //     const salaryPerDay = user.salaryPerDay || 0;
  //     const baseSalary = workingDays * salaryPerDay;

  //     let allowance = 0;
  //     let deduction = 0;

  //     if (user.adjustments) {
  //       user.adjustments.forEach((adj) => {

  //         if (!adj.isActive) return;

  //         if (adj.type.type === 'ADD') {
  //           allowance += Number(adj.amount);
  //         }

  //         if (adj.type.type === 'DEDUCT') {
  //           deduction += Number(adj.amount);
  //         }

  //       });
  //     }

  //     const finalSalary = baseSalary + allowance - deduction;

  //     await this.payrollRepo.save({
  //       user,
  //       month,
  //       workingDays,
  //       salaryPerDay,
  //       baseSalary,
  //       bonus: allowance,
  //       deduction,
  //       finalSalary,
  //     });

  //   }

  //   return { message: 'Payroll generated successfully' };
  // }

  // async generatePayroll() {

  //   const now = dayjs();
  //   const targetMonth = now.format('YYYY-MM');

  //   const startMonth = now.startOf('month').toDate();
  //   const endMonth = now.endOf('month').toDate();

  //   await this.payrollRepo.delete({
  //     month: targetMonth,
  //   });

  //   const users = await this.userRepo.find({
  //     relations: ['adjustments', 'adjustments.type'],
  //   });

  //   for (const user of users) {

  //     const weeks = await this.workScheduleWeekRepo.find({
  //       where: {
  //         user: { id: user.id },
  //         status: 'APPROVED',
  //         weekStartDate: LessThanOrEqual(endMonth),
  //         weekEndDate: MoreThanOrEqual(startMonth),
  //       },
  //       relations: ['days'],
  //     });

  //     let workingDays = 0;

  //     weeks.forEach((week) => {
  //       week.days.forEach((day) => {
  //         if (day.isWorking) workingDays++;
  //       });
  //     });

  //     const leaves = await this.leaveRepo
  //       .createQueryBuilder('leave')
  //       .leftJoin('leave.user', 'user')
  //       .where('user.id = :userId', { userId: user.id })
  //       .andWhere('leave.status = :status', { status: 'APPROVED' })
  //       .andWhere('leave.startDate <= :endMonth', { endMonth })
  //       .andWhere('leave.endDate >= :startMonth', { startMonth })
  //       .getMany();

  //     let leaveDays = 0;

  //     leaves.forEach((leave) => {

  //       const leaveStart = dayjs(leave.startDate).isAfter(startMonth)
  //         ? dayjs(leave.startDate)
  //         : dayjs(startMonth);

  //       const leaveEnd = dayjs(leave.endDate).isBefore(endMonth)
  //         ? dayjs(leave.endDate)
  //         : dayjs(endMonth);

  //       const days = leaveEnd.diff(leaveStart, 'day') + 1;

  //       leaveDays += days;

  //     });

  //     workingDays = workingDays - leaveDays;
  //     if (workingDays < 0) workingDays = 0;

  //     const salaryPerDay = Number(user.salaryPerDay) || 0;
  //     const baseSalary = workingDays * salaryPerDay;

  //     let allowance = 0;
  //     let deduction = 0;

  //     const adjustmentDetails: {
  //       type: 'ADD' | 'DEDUCT';
  //       name: string;
  //       amount: number;
  //       description: string;
  //     }[] = [];

  //     if (user.adjustments) {
  //       user.adjustments.forEach((adj) => {

  //         if (!adj.isActive) return;

  //         const amount = Number(adj.amount);

  //         if (adj.type.type === 'ADD') allowance += amount;
  //         if (adj.type.type === 'DEDUCT') deduction += amount;

  //         adjustmentDetails.push({
  //           type: adj.type.type,
  //           name: adj.type.name,
  //           amount,
  //           description: adj.type.description
  //         });

  //       });
  //     }

  //     const finalSalary = baseSalary + allowance - deduction;

  //     const snapshot = {
  //       userId: user.id,
  //       month: targetMonth,

  //       workingDays,
  //       leaveDays,

  //       salaryPerDay,
  //       baseSalary,

  //       allowance,
  //       deduction,
  //       finalSalary,

  //       adjustments: adjustmentDetails,
  //     };

  //     await this.payrollRepo.save({
  //       user,
  //       month: targetMonth,
  //       workingDays,
  //       salaryPerDay,
  //       baseSalary,
  //       bonus: allowance,
  //       deduction,
  //       finalSalary,
  //       snapshot,
  //     });

  //   }

  //   return { message: 'Payroll generated successfully' };
  // }

  async generatePayroll() {

    const now = dayjs();
    const targetMonth = now.format('YYYY-MM');

    const startMonth = now.startOf('month');
    const endMonth = now.endOf('month');

    await this.payrollRepo.delete({
      month: targetMonth,
    });

    const users = await this.userRepo.find({
      relations: ['adjustments', 'adjustments.type'],
    });

    for (const user of users) {

      const weeks = await this.workScheduleWeekRepo.find({
        where: {
          user: { id: user.id },
          status: 'APPROVED',
          weekStartDate: LessThanOrEqual(endMonth.toDate()),
          weekEndDate: MoreThanOrEqual(startMonth.toDate()),
        },
        relations: ['days'],
      });

      console.log(JSON.stringify(weeks, null, 2));

      // Lưu tất cả ngày đăng ký làm trong tháng
      const workingDateSet = new Set<string>();

      for (const week of weeks) {
        for (const day of week.days) {
          if (!day.isWorking) continue;

          const date = dayjs(week.weekStartDate).add(day.dayOfWeek, 'day');

          if (
            (date.isAfter(startMonth) || date.isSame(startMonth, 'day')) &&
            (date.isBefore(endMonth) || date.isSame(endMonth, 'day'))
          ) {
            workingDateSet.add(date.format('YYYY-MM-DD'));
          }
        }
      }

      let workingDays = workingDateSet.size;

      const leaves = await this.leaveRepo
        .createQueryBuilder('leave')
        .leftJoin('leave.user', 'user')
        .where('user.id = :userId', { userId: user.id })
        .andWhere('leave.status = :status', { status: 'APPROVED' })
        .andWhere('leave.startDate <= :endMonth', { endMonth: endMonth.toDate() })
        .andWhere('leave.endDate >= :startMonth', { startMonth: startMonth.toDate() })
        .getMany();

      let leaveDays = 0;

      for (const leave of leaves) {

        let d = dayjs(leave.startDate);
        const leaveEnd = dayjs(leave.endDate);

        if (d.isBefore(startMonth)) d = startMonth;

        const end = leaveEnd.isAfter(endMonth)
          ? endMonth
          : leaveEnd;

        for (
          let date = d;
          date.isBefore(end) || date.isSame(end, 'day');
          date = date.add(1, 'day')
        ) {
          const key = date.format('YYYY-MM-DD');

          // chỉ trừ nếu ngày đó có đăng ký làm
          if (workingDateSet.has(key)) {
            leaveDays++;
          }
        }
      }

      workingDays = workingDays - leaveDays;
      if (workingDays < 0) workingDays = 0;

      const salaryPerDay = Number(user.salaryPerDay) || 0;
      const baseSalary = workingDays * salaryPerDay;

      let allowance = 0;
      let deduction = 0;

      const adjustmentDetails: {
        type: 'ADD' | 'DEDUCT';
        name: string;
        amount: number;
        description: string;
      }[] = [];

      if (user.adjustments) {
        user.adjustments.forEach((adj) => {

          if (!adj.isActive) return;

          const amount = Number(adj.amount);

          if (adj.type.type === 'ADD') allowance += amount;
          if (adj.type.type === 'DEDUCT') deduction += amount;

          adjustmentDetails.push({
            type: adj.type.type,
            name: adj.type.name,
            amount,
            description: adj.type.description
          });

        });
      }

      const finalSalary = baseSalary + allowance - deduction;

      const snapshot = {
        userId: user.id,
        month: targetMonth,
        workingDays,
        leaveDays,
        salaryPerDay,
        baseSalary,
        allowance,
        deduction,
        finalSalary,
        adjustments: adjustmentDetails,
      };

      await this.payrollRepo.save({
        user,
        month: targetMonth,
        workingDays,
        salaryPerDay,
        baseSalary,
        bonus: allowance,
        deduction,
        finalSalary,
        snapshot,
      });

    }

    return { message: 'Payroll generated successfully' };
  }

  async getPayrollByMonth(month: string) {

    const year = new Date().getFullYear();
    const targetMonth = dayjs(`${year}-${month}-01`).format('YYYY-MM');

    const payrolls = await this.payrollRepo.find({
      where: { month: targetMonth },
      relations: [
        'user',
        'user.department',
      ],
      withDeleted: true,
    });

    return payrolls.map((payroll) => {

      const snapshot = payroll.snapshot;
      console.log('snap', payroll.snapshot)

      return {
        payrollId: payroll.id,
        month: payroll.month,

        user: {
          id: payroll.user.id,
          name: payroll.user.fullName,
          email: payroll.user.email,
          department: payroll.user.department?.name,
        },
        workingDays: snapshot?.workingDays ?? null,
        leaveDays: snapshot?.leaveDays ?? null,

        salaryPerDay: snapshot?.salaryPerDay ?? null,
        baseSalary: snapshot?.baseSalary ?? null,

        allowance: snapshot?.allowance ?? null,
        deduction: snapshot?.deduction ?? null,

        finalSalary: snapshot?.finalSalary ?? null,
        adjustments: snapshot?.adjustments ?? null,
      };

    });
  }

  async getUserPayroll(userId: string, month: string) {
    const year = new Date().getFullYear();
    const targetMonth = dayjs(`${year}-${month}-01`).format('YYYY-MM');

    const payroll = await this.payrollRepo.findOne({
      where: {
        user: { id: userId },
        month: targetMonth,
      },
      relations: [
        'user',
        'user.department',
      ],
    });

    if (!payroll) {
      return {}
    }

    const snapshot = payroll.snapshot ?? {};

    return {
      payrollId: payroll.id,
      month: payroll.month,

      user: {
        id: payroll.user.id,
        name: payroll.user.fullName,
        email: payroll.user.email,
        department: payroll.user.department?.name,
      },

      workingDays: snapshot.workingDays,
      leaveDays: snapshot.leaveDays,

      salaryPerDay: snapshot.salaryPerDay,
      baseSalary: snapshot.baseSalary,

      allowance: snapshot.allowance,
      deduction: snapshot.deduction,

      finalSalary: snapshot.finalSalary,

      adjustments: (snapshot.adjustments || []).map((adj) => ({
        name: adj.name,
        type: adj.type,
        amount: adj.amount,
      })),
    };
  }

async exportUserPayrollPdf(userId: string, month: string, res: Response) {
  const data = await this.getUserPayroll(userId, month);

  console.log('PDF DATA', data);

  if (!data || !data.payrollId) {
    throw new NotFoundException('Payroll not found');
  }

  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
  });

  res.setHeader(
    'Content-Disposition',
    `attachment; filename=payslip-${data.month}.pdf`,
  );
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(22).text('PAYSLIP', { align: 'center' }).moveDown();

  doc.fontSize(12).text(`Month: ${data.month}`, { align: 'center' }).moveDown(2);

  doc
    .fontSize(12)
    .text(`Employee: ${data.user.name}`)
    .text(`Email: ${data.user.email}`)
    .text(`Department: ${data.user.department || '-'}`)
    .moveDown();

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

  doc.fontSize(14).text('Work Summary').moveDown(0.5);

  doc
    .fontSize(12)
    .text(`Working Days: ${data.workingDays}`)
    .text(`Leave Days: ${data.leaveDays}`)
    .text(`Salary / Day: ${this.formatMoney(data.salaryPerDay)}`)
    .text(`Base Salary: ${this.formatMoney(data.baseSalary)}`)
    .moveDown();

  doc.fontSize(14).text('Adjustments').moveDown(0.5);

  if (!data.adjustments?.length) {
    doc.text('No adjustments');
  } else {
    data.adjustments.forEach((adj) => {
      doc.text(
        `${adj.type === 'ADD' ? '+' : '-'} ${adj.name}: ${this.formatMoney(adj.amount)}`,
      );
    });
  }

  doc.moveDown();

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

  doc
    .fontSize(12)
    .text(`Allowance: ${this.formatMoney(data.allowance)}`)
    .text(`Deduction: ${this.formatMoney(data.deduction)}`)
    .moveDown();

  doc
    .fontSize(18)
    .text(`Final Salary: ${this.formatMoney(data.finalSalary)}`, {
      align: 'right',
    });

  doc.end();
}

  private buildHeader(doc: PDFKit.PDFDocument, payroll: Payroll) {
    doc
      .fontSize(22)
      .text('PAYSLIP', { align: 'center' })
      .moveDown();

    doc
      .fontSize(12)
      .text(`Month: ${payroll.month}`, { align: 'center' })
      .moveDown();
  }

  private buildEmployeeInfo(doc: PDFKit.PDFDocument, payroll: Payroll) {
    doc
      .fontSize(12)
      .text(`Employee: ${payroll.user.fullName}`)
      .text(`Employee ID: ${payroll.user.id}`)
      .moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
  }

  private buildSalaryInfo(doc: PDFKit.PDFDocument, snapshot: any) {
    doc.fontSize(14).text('Work Summary');
    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(`Working Days: ${snapshot.workingDays}`)
      .text(`Leave Days: ${snapshot.leaveDays}`)
      .text(`Salary Per Day: ${this.formatMoney(snapshot.salaryPerDay)}`)
      .text(`Base Salary: ${this.formatMoney(snapshot.baseSalary)}`)
      .moveDown();
  }

  private buildAdjustments(doc: PDFKit.PDFDocument, snapshot: any) {
    doc.fontSize(14).text('Adjustments');
    doc.moveDown(0.5);

    if (!snapshot.adjustments?.length) {
      doc.text('No adjustments');
      doc.moveDown();
      return;
    }

    snapshot.adjustments.forEach((adj) => {
      doc
        .fontSize(12)
        .text(
          `${adj.type === 'ADD' ? '+' : '-'} ${adj.name}: ${this.formatMoney(adj.amount)}`,
        );
    });

    doc.moveDown();
  }

  private buildTotal(doc: PDFKit.PDFDocument, snapshot: any) {
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Allowance: ${this.formatMoney(snapshot.allowance)}`)
      .text(`Deduction: ${this.formatMoney(snapshot.deduction)}`)
      .moveDown();

    doc
      .fontSize(18)
      .text(`Final Salary: ${this.formatMoney(snapshot.finalSalary)}`, {
        align: 'right',
      });

    doc.moveDown(2);

    doc
      .fontSize(10)
      .text('Generated by HR System', { align: 'center' });
  }

  private formatMoney(value: number) {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
  }
}


