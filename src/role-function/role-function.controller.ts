import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleFunctionService } from './role-function.service';
import { CreateRoleFunctionDto } from './dto/create-role-function.dto';
import { UpdateRoleFunctionDto } from './dto/update-role-function.dto';

@Controller('role-function')
export class RoleFunctionController {
  constructor(private readonly roleFunctionService: RoleFunctionService) {}

  @Post()
  create(@Body() createRoleFunctionDto: CreateRoleFunctionDto) {
    return this.roleFunctionService.create(createRoleFunctionDto);
  }

  @Get()
  findAll() {
    return this.roleFunctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleFunctionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleFunctionDto: UpdateRoleFunctionDto) {
    return this.roleFunctionService.update(+id, updateRoleFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleFunctionService.remove(+id);
  }
}
