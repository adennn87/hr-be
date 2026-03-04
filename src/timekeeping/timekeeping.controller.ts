import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { CreateTimekeepingDto } from './dto/create-timekeeping.dto';
import { UpdateTimekeepingDto } from './dto/update-timekeeping.dto';

@Controller('timekeeping')
export class TimekeepingController {
  constructor(private readonly timekeepingService: TimekeepingService) {}

  @Post()
  create(@Body() createTimekeepingDto: CreateTimekeepingDto) {
    return this.timekeepingService.create(createTimekeepingDto);
  }

  @Get()
  findAll() {
    return this.timekeepingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timekeepingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimekeepingDto: UpdateTimekeepingDto) {
    return this.timekeepingService.update(+id, updateTimekeepingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timekeepingService.remove(+id);
  }
}
