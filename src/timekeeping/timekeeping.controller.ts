import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { CreateTimekeepingDto } from './dto/create-timekeeping.dto';
import { UpdateTimekeepingDto } from './dto/update-timekeeping.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('timekeeping')
export class TimekeepingController {
  constructor(private readonly timekeepingService: TimekeepingService) {}

  @RequireFunction('TIMEKEEPING_CREATE')
  @Post()
  create(@Body() createTimekeepingDto: CreateTimekeepingDto) {
    return this.timekeepingService.create(createTimekeepingDto);
  }

  @RequireFunction('TIMEKEEPING_VIEW')
  @Get()
  findAll() {
    return this.timekeepingService.findAll();
  }

  @RequireFunction('TIMEKEEPING_DETAIL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timekeepingService.findOne(+id);
  }

  @RequireFunction('TIMEKEEPING_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimekeepingDto: UpdateTimekeepingDto) {
    return this.timekeepingService.update(+id, updateTimekeepingDto);
  }

  @RequireFunction('TIMEKEEPING_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timekeepingService.remove(+id);
  }
}