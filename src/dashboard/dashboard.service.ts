import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DashboardOverviewResponse,
  IamCoreResponse,
} from './interfaces/dashboard.interface';
import { DashboardModuleEntity } from './entities/dashboard-module.entity';
import { User } from '../users/entities/user.entity';
import { RoleFunction } from '../roles/entities/role_function.entity';
import { IamPolicyRuleEntity } from './entities/iam-policy-rule.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(DashboardModuleEntity)
    private readonly dashboardModuleRepo: Repository<DashboardModuleEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(RoleFunction)
    private readonly roleFunctionRepo: Repository<RoleFunction>,
    @InjectRepository(IamPolicyRuleEntity)
    private readonly iamPolicyRuleRepo: Repository<IamPolicyRuleEntity>,
  ) {}

  async getOverview(): Promise<DashboardOverviewResponse> {
    const modules = await this.dashboardModuleRepo.find({
      where: { isEnabled: true },
      order: { title: 'ASC' },
    });

    return {
      greeting: 'Xin chào, System Admin!',
      activeSessions: 1,
      securityScore: 85,
      riskLevel: 'Rủi ro thấp',
      allowedModules: modules.length,
      modules: modules.map((item) => ({
        code: item.code,
        title: item.title,
        subtitle: item.subtitle,
        domain: item.domain,
        riskLevel: item.riskLevel,
      })),
      zeroTrustNotice:
        'Mọi hành động đang được giám sát và ghi nhận vào audit log. Quyền truy cập được đánh giá liên tục theo ngữ cảnh.',
    };
  }

  async getIamCoreData(): Promise<IamCoreResponse> {
    // Lưu ý: Thêm relations: ['role'] để lấy được thông tin từ bảng Role liên kết
    const [directoryUsers, roleFunctions, policyRules] = await Promise.all([
      this.userRepo.find(),
      this.roleFunctionRepo.find({ relations: ['role'] }), 
      this.iamPolicyRuleRepo.find(),
    ]);

    const active = directoryUsers.filter((u) => u.status === 'active').length;
    const suspended = directoryUsers.length - active;

    const totalUsersInRoles = roleFunctions.reduce(
      (total, rf) => total + (rf.roleCount || 0),
      0,
    );

    // Khởi tạo accumulator với giá trị mặc định để tránh lỗi runtime
    const bySeverity = policyRules.reduce(
      (acc, rule) => {
        const sev = rule.severity as 'critical' | 'high' | 'medium';
        if (acc[sev] !== undefined) {
          acc[sev] += 1;
        }
        return acc;
      },
      { critical: 0, high: 0, medium: 0 },
    );

    return {
      userDirectory: {
        total: directoryUsers.length,
        active,
        suspended,
        entries: directoryUsers,
      },
      rbac: {
        roles: roleFunctions.map((item) => ({
          id: item.id,
          roleName: item.role?.name || 'N/A', // Sử dụng optional chaining
          roleCount: item.roleCount,
          functions: item.function,
        })),
        totalUsersInRoles,
      },
      policyEngine: {
        total: policyRules.length,
        bySeverity,
        rules: policyRules.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          severity: item.severity as any,
          expression: item.expression,
          action: item.action,
        })),
      },
    };
  }
}