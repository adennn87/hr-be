import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FunctionService } from './function.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';

@UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @RequireFunction('FUNCTION_CREATE')
  @Post()
  create(@Body() createFunctionDto: CreateFunctionDto) {
    return this.functionService.create(createFunctionDto);
  }

  @RequireFunction('FUNCTION_VIEW')
  @Get()
  findAll() {
    return this.functionService.findAll();
  }

  @RequireFunction('FUNCTION_DETAIL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionService.findOne(+id);
  }

  @RequireFunction('FUNCTION_UPDATE')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunctionDto: UpdateFunctionDto) {
    return this.functionService.update(+id, updateFunctionDto);
  }

  @RequireFunction('FUNCTION_DELETE')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionService.remove(+id);
  }
}