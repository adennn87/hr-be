import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { FunctionModule } from './function/function.module';
import { RoleFunctionModule } from './role-function/role-function.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, FunctionModule, RoleFunctionModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
