import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';

// @UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @RequireFunction('ROLE_CREATE')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @RequireFunction('ROLE_VIEW')
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @RequireFunction('ROLE_DETAIL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @RequireFunction('ROLE_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @RequireFunction('ROLE_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}