// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import {
//   DashboardOverviewResponse,
//   IamCoreResponse,
// } from './interfaces/dashboard.interface';
// import { DashboardModuleEntity } from './entities/dashboard-module.entity';
// import { User } from '../users/entities/user.entity';
// import { RoleFunction } from '../roles/entities/role_function.entity';
// import { IamPolicyRuleEntity } from './entities/iam-policy-rule.entity';

// @Injectable()
// export class DashboardService {
//   constructor(
//     @InjectRepository(DashboardModuleEntity)
//     private readonly dashboardModuleRepo: Repository<DashboardModuleEntity>,
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//     @InjectRepository(RoleFunction)
//     private readonly roleFunctionRepo: Repository<RoleFunction>,
//     @InjectRepository(IamPolicyRuleEntity)
//     private readonly iamPolicyRuleRepo: Repository<IamPolicyRuleEntity>,
//   ) {}

//   async getOverview(): Promise<DashboardOverviewResponse> {
//     const modules = await this.dashboardModuleRepo.find({
//       where: { isEnabled: true },
//       order: { title: 'ASC' },
//     });

//     return {
//       greeting: 'Xin chào, System Admin!',
//       activeSessions: 1,
//       securityScore: 85,
//       riskLevel: 'Rủi ro thấp',
//       allowedModules: modules.length,
//       modules: modules.map((item) => ({
//         code: item.code,
//         title: item.title,
//         subtitle: item.subtitle,
//         domain: item.domain,
//         riskLevel: item.riskLevel,
//       })),
//       zeroTrustNotice:
//         'Mọi hành động đang được giám sát và ghi nhận vào audit log. Quyền truy cập được đánh giá liên tục theo ngữ cảnh.',
//     };
//   }

//   async getIamCoreData(): Promise<IamCoreResponse> {
//     const [directoryUsers, roleFunctions, policyRules] = await Promise.all([
//       this.userRepo.find(),
//       this.roleFunctionRepo.find(),
//       this.iamPolicyRuleRepo.find(),
//     ]);

//     const active = directoryUsers.filter(
//       (user) => user.status === 'active',
//     ).length;
//     const suspended = directoryUsers.length - active;

//     // const byDepartment = directoryUsers.reduce<Record<string, number>>(
//     //   (acc, user) => {
//     //     acc[user.department] = (acc[user.department] ?? 0) + 1;
//     //     return acc;
//     //   },
//     //   {},
//     // );

//     const totalUsersInRoles = roleFunctions.reduce(
//       (total, role) => total + role.roleCount,
//       0,
//     );

//     const bySeverity = policyRules.reduce<
//       Record<'critical' | 'high' | 'medium', number>
//     >(
//       (acc, rule) => {
//         acc[rule.severity] += 1;
//         return acc;
//       },
//       { critical: 0, high: 0, medium: 0 },
//     );

//     return {
//       userRepo: {
//         total: directoryUsers.length,
//         active,
//         suspended,
//         // byDepartment,
//         entries: directoryUsers,
//       },
//       rbac: {
//         roles: roleFunctions.map((item) => ({
//           id: item.id,
//           roleName: item.role.name,
//           roleCount: item.roleCount,
//           functions: Array.isArray(item.function) ? item.function : [],
//         })),
//         totalUsersInRoles,
//       },    
//       policyEngine: {
//         total: policyRules.length,
//         bySeverity,
//         rules: policyRules.map((item) => ({
//           id: item.id,
//           title: item.title,
//           type: item.type,
//           severity: item.severity,
//           expression: item.expression,
//           action: item.action,
//         })),
//       },
//     };
//   }
// }