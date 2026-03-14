import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveStatusDto } from './dto/update-leave-request.dto';


@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(private readonly leaveService: LeaveRequestsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateLeaveRequestDto) {
    return this.leaveService.create(req.user, dto);
  }

  @Get('me')
  myLeaves(@Req() req) {
    return this.leaveService.findMyLeaves(req.user.id);
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