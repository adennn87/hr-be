import { Injectable } from '@nestjs/common';
import { CreateTimekeepingDto } from './dto/create-timekeeping.dto';
import { UpdateTimekeepingDto } from './dto/update-timekeeping.dto';

@Injectable()
export class TimekeepingService {
  create(createTimekeepingDto: CreateTimekeepingDto) {
    return 'This action adds a new timekeeping';
  }

  findAll() {
    return `This action returns all timekeeping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timekeeping`;
  }

  update(id: number, updateTimekeepingDto: UpdateTimekeepingDto) {
    return `This action updates a #${id} timekeeping`;
  }

  remove(id: number) {
    return `This action removes a #${id} timekeeping`;
  }
}
