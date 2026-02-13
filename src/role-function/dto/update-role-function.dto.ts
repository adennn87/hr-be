import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleFunctionDto } from './create-role-function.dto';

export class UpdateRoleFunctionDto extends PartialType(CreateRoleFunctionDto) {}
