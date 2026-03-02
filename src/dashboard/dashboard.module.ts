import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardModuleEntity } from './entities/dashboard-module.entity';
import { User } from '../users/entities/user.entity';
import { RoleFunction } from '../roles/entities/role_function.entity';
import { IamPolicyRuleEntity } from './entities/iam-policy-rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DashboardModuleEntity,
      User,
      RoleFunction,
      IamPolicyRuleEntity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}