import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreateAdjustmentTypeDto } from './dto/create-adjustment-type.dto';
import { CreateUserAdjustmentDto } from './dto/CreateUserAdjustmentDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  // Tạo bảng lương
  @RequireFunction('PAYROLL_GENERATE')
  @Post('generate')
  generate() {
    return this.payrollService.generatePayroll();
  }

  // Tạo loại phụ cấp / khấu trừ
  @RequireFunction('PAYROLL_ADJUSTMENT_TYPE_CREATE')
  @Post('CreateAdjustmentType')
  async createType(@Body() dto: CreateAdjustmentTypeDto) {
    return await this.payrollService.createAdjustmentType(dto);
  }

  // Lấy payroll theo id
  @RequireFunction('PAYROLL_VIEW')
  @Get('')
  getPayroll(@Query('id') id: string) {
    return this.payrollService.getPayrollById(id);
  }

  // Thêm phụ cấp / khấu trừ cho user
  // @RequireFunction('PAYROLL_ADJUSTMENT_CREATE')
  @Post('adjustments')
  addAdjustment(@Body() dto: CreateUserAdjustmentDto) {
    return this.payrollService.addAdjustment(dto);
  }

  // Lấy payroll theo tháng
  @RequireFunction('PAYROLL_VIEW')
  @Get('month')
  getPayrollByMonth(@Query('month') month: string) {
    return this.payrollService.getPayrollByMonth(month);
  }

  // Lấy payroll của user
  @RequireFunction('PAYROLL_VIEW_USER')
  @Get('user')
  getUserPayroll(
    @Query('userId') userId: string,
    @Query('month') month: string,
  ) {
    return this.payrollService.getUserPayroll(userId, month);
  }
}