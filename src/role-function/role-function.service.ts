import { Injectable } from '@nestjs/common';
import { CreateRoleFunctionDto } from './dto/create-role-function.dto';
import { UpdateRoleFunctionDto } from './dto/update-role-function.dto';

@Injectable()
export class RoleFunctionService {
  create(createRoleFunctionDto: CreateRoleFunctionDto) {
    return 'This action adds a new roleFunction';
  }

  findAll() {
    return `This action returns all roleFunction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleFunction`;
  }

  update(id: number, updateRoleFunctionDto: UpdateRoleFunctionDto) {
    return `This action updates a #${id} roleFunction`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleFunction`;
  }
}
