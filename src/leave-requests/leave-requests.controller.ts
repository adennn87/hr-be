import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveStatusDto } from './dto/update-leave-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveService: LeaveRequestsService) {}

  // Tạo đơn nghỉ phép
  @RequireFunction('LEAVE_REQUEST_CREATE')
  @Post()
  create(@Req() req, @Body() dto: CreateLeaveRequestDto) {
    return this.leaveService.create(req.user.userId, dto);
  }

  // Xem đơn nghỉ của chính mình
  @RequireFunction('LEAVE_REQUEST_VIEW_ME')
  @Get('me')
  myLeaves(@Req() req) {
    return this.leaveService.findMyLeaves(req.user.userId);
  }

  // HR / Admin xem toàn bộ đơn nghỉ
  @RequireFunction('LEAVE_REQUEST_VIEW')
  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  // Duyệt / từ chối đơn nghỉ
  @RequireFunction('LEAVE_REQUEST_APPROVE')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLeaveStatusDto,
  ) {
    return this.leaveService.updateStatus(id, dto);
  }
}