import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreateAdjustmentTypeDto } from './dto/create-adjustment-type.dto';
import { CreateUserAdjustmentDto } from './dto/CreateUserAdjustmentDto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) { }

  @Post('generate')
  generate() {
    return this.payrollService.generatePayroll();
  }

  @Post('CreateAdjustmentType')
  async createType(@Body() dto: CreateAdjustmentTypeDto) {
    return await this.payrollService.createAdjustmentType(dto);
  }

  @Get(':id')
  getPayroll(@Param('id') id: string) {
    return this.payrollService.getPayrollById(id);
  }

  @Post('adjustments')
  addAdjustment(@Body() dto: CreateUserAdjustmentDto) {
    return this.payrollService.addAdjustment(dto);
  }

  @Get('month/:month')
  getPayrollByMonth(@Param('month') month: string) {
    return this.payrollService.getPayrollByMonth(month);
  }

  @Get('user/:userId/:month')
  getUserPayroll(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.payrollService.getUserPayroll(userId, month);
  }

}