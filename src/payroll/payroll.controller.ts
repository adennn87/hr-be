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

  @Get('')
  getPayroll(@Query('id') id: string) {
    return this.payrollService.getPayrollById(id);
  }

  @Post('adjustments')
  addAdjustment(@Body() dto: CreateUserAdjustmentDto) {
    return this.payrollService.addAdjustment(dto);
  }

  @Get('month')
  getPayrollByMonth(@Query('month') month: string) {
    return this.payrollService.getPayrollByMonth(month);
  }

  @Get('user')
  getUserPayroll(
    @Query('userId') userId: string,
    @Query('month') month: string,
  ) {
    return this.payrollService.getUserPayroll(userId, month);
  }

}