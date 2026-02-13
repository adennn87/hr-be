import { Module } from '@nestjs/common';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';
import { RoleModule } from './role-/role-.module';

@Module({
  controllers: [FunctionController],
  providers: [FunctionService],
  imports: [RoleModule],
})
export class FunctionModule {}
