import { Controller, Get, Post, Body, Query, UseGuards, Param, Request, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Position } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';
import { profile } from 'console';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @RequireFunction('USER_VIEW')
  @Get()
  async findAll(
    @Query('department') department?: string,
    @Query('position') position?: Position,
  ) {
    return await this.usersService.findAll(department, position);
  }

  @Get('/group-by-department')
  getUsersGroupedByDepartment() {
    return this.usersService.getUsersGroupedByDepartment();
  }
  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get("profile")
  async profile(@Request() req: any) {
    return await this.usersService.profile(req.user)
  }

  @Patch()
  async updatUser(@Request() req: any, @Body() dto: UpdateUserDto) {
    console.log(req.user)
    return await this.usersService.updateUser(req.user, dto)
  }
  @RequireFunction('USER_UPDATE')
  @Patch('userAdmin')
  async updateUserAuth(@Query('id') id: string,
    @Body() dto: UpdateUserAuthDto) {
    return await this.usersService.updateUserAdmin(id, dto)
  }

  @RequireFunction('DELETE_USER')
  @Delete('DeleteUser')
  async deleteUser(@Query('id') id: string){
    return await this.usersService.deleteUser(id)
  }
}