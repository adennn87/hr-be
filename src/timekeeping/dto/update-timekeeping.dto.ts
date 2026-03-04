import { PartialType } from '@nestjs/swagger';
import { CreateTimekeepingDto } from './create-timekeeping.dto';

export class UpdateTimekeepingDto extends PartialType(CreateTimekeepingDto) {}
