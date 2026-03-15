import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';
import { WorkSchedulesService } from './weekly-schedules.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';

/**
 * Controller quản lý lịch làm việc theo tuần của nhân viên
 *
 * Các endpoint trong controller này cho phép:
 * - Tạo lịch làm việc theo tuần
 * - Xem danh sách lịch
 * - Xem chi tiết lịch
 * - Cập nhật lịch
 * - Xóa lịch
 *
 * Toàn bộ API đều yêu cầu:
 * - đăng nhập (JwtAuthGuard)
 * - kiểm tra quyền chức năng (FunctionGuard)
 */
@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('weekly-schedules')
export class WeeklySchedulesController {
  constructor(private readonly weeklySchedulesService: WorkSchedulesService) {}

  /**
   * API: Tạo lịch làm việc tuần mới
   *
   * Quyền yêu cầu:
   * WEEKLY_SCHEDULE_CREATE
   *
   * Chức năng:
   * - Tạo lịch làm việc cho 1 user trong 1 tuần
   * - Bao gồm danh sách ngày làm việc (WorkScheduleDay)
   * - Ví dụ:
   *   Thứ 2 → Thứ 6: 08:00 - 17:00
   *   Thứ 7, CN: nghỉ
   *
   * Dữ liệu đầu vào:
   * CreateWorkScheduleDto
   *
   * Flow:
   * Client → Controller → Service.create() → Database
   */
  @RequireFunction('WEEKLY_SCHEDULE_CREATE')
  @Post()
  create(@Body() createWeeklyScheduleDto: CreateWorkScheduleDto) {
    return this.weeklySchedulesService.create(createWeeklyScheduleDto);
  }

  /**
   * API: Lấy danh sách toàn bộ lịch làm việc
   *
   * Quyền yêu cầu:
   * WEEKLY_SCHEDULE_VIEW
   *
   * Chức năng:
   * - Lấy toàn bộ lịch làm việc theo tuần trong hệ thống
   * - Dùng cho:
   *   + Admin
   *   + HR
   *   + Manager
   *
   * Ví dụ dữ liệu trả về:
   * [
   *   {
   *     user: "Minh",
   *     weekStartDate: "2026-03-16",
   *     status: "APPROVED"
   *   }
   * ]
   */
  @RequireFunction('WEEKLY_SCHEDULE_VIEW')
  @Get()
  findAll() {
    return this.weeklySchedulesService.findAll();
  }

  /**
   * API: Lấy chi tiết lịch làm việc của một tuần
   *
   * Quyền yêu cầu:
   * WEEKLY_SCHEDULE_DETAIL
   *
   * Params:
   * id = id của WorkScheduleWeek
   *
   * Chức năng:
   * - Lấy thông tin tuần
   * - Lấy toàn bộ ngày trong tuần (WorkScheduleDay)
   *
   * Ví dụ:
   * Monday: 08:00 - 17:00
   * Tuesday: 08:00 - 17:00
   * Wednesday: OFF
   */
  @RequireFunction('WEEKLY_SCHEDULE_DETAIL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklySchedulesService.findOne(id);
  }

  /**
   * API: Cập nhật lịch làm việc tuần
   *
   * Quyền yêu cầu:
   * WEEKLY_SCHEDULE_UPDATE
   *
   * Chức năng:
   * - Thay đổi giờ làm
   * - Thay đổi ngày làm
   * - Ví dụ:
   *   đổi từ
   *   08:00 - 17:00
   *
   *   thành
   *   09:00 - 18:00
   *
   * Input:
   * UpdateWorkScheduleDto
   *
   * Lưu ý:
   * - Có thể cập nhật status (PENDING / APPROVED / REJECTED)
   */
  @RequireFunction('WEEKLY_SCHEDULE_UPDATE')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWeeklyScheduleDto: UpdateWorkScheduleDto,
  ) {
    return this.weeklySchedulesService.update(id, updateWeeklyScheduleDto);
  }

  /**
   * API: Xóa lịch làm việc
   *
   * Quyền yêu cầu:
   * WEEKLY_SCHEDULE_DELETE
   *
   * Params:
   * id = id của WorkScheduleWeek
   *
   * Chức năng:
   * - Xóa toàn bộ lịch của tuần
   * - Các WorkScheduleDay liên quan sẽ bị xóa theo (cascade)
   *
   * Thường chỉ:
   * - Admin
   * - HR
   * được phép xóa
   */
  @RequireFunction('WEEKLY_SCHEDULE_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklySchedulesService.remove(id);
  }
}