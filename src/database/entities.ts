import { User } from '../users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoleFunction } from 'src/roles/entities/role_function.entity';
import { Function_permission } from 'src/function/entities/function.entity';
import { IamPolicyRuleEntity } from 'src/dashboard/entities/iam-policy-rule.entity';
import { DashboardModuleEntity } from 'src/dashboard/entities/dashboard-module.entity';
import { AllocatedAsset } from 'src/allocated-assets/entities/allocated-asset.entity';
import { Asset } from 'src/allocated-assets/entities/asset.entity';
import { WorkScheduleWeek } from 'src/weekly-schedules/entities/work_schedule_weeks.entity';
import { WorkScheduleDay } from 'src/weekly-schedules/entities/work_schedule_days.entity';
import { PasswordResetToken } from 'src/auth/entities/password-reset-token.entity';

export const entities = [User, Function_permission, Role, RoleFunction, IamPolicyRuleEntity, DashboardModuleEntity, Asset, AllocatedAsset, WorkScheduleDay, WorkScheduleWeek, PasswordResetToken]; 