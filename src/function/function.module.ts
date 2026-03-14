import { Module } from '@nestjs/common';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Function_permission } from './entities/function.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Function_permission])],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [FunctionService],
})
export class FunctionModule {}
