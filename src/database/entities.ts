import { User } from '../users/entities/user.entity';
import { Otp } from '../auth/entities/otp.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoleFunction } from 'src/roles/entities/role_function.entity';
import { Function } from 'src/function/entities/function.entity';
import { IamPolicyRuleEntity } from 'src/dashboard/entities/iam-policy-rule.entity';
import { DashboardModuleEntity } from 'src/dashboard/entities/dashboard-module.entity';
import { AllocatedAsset } from 'src/allocated-assets/entities/allocated-asset.entity';
import { Asset } from 'src/allocated-assets/entities/asset.entity';

export const entities = [User, Otp, Function, Role, RoleFunction, IamPolicyRuleEntity, DashboardModuleEntity, Asset, AllocatedAsset]; 