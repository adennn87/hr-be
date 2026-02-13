import { Module } from '@nestjs/common';
import { RoleFunctionService } from './role-function.service';
import { RoleFunctionController } from './role-function.controller';

@Module({
  controllers: [RoleFunctionController],
  providers: [RoleFunctionService],
})
export class RoleFunctionModule {}
