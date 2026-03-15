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

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveService: LeaveRequestsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateLeaveRequestDto) {
    console.log('Creating leave request with data:', req.user);
    return this.leaveService.create(req.user.userId, dto);
  }

  @Get('me')
  myLeaves(@Req() req) {
    return this.leaveService.findMyLeaves(req.user.userId);
  }

  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLeaveStatusDto,
  ) {
    return this.leaveService.updateStatus(id, dto);
  }
}