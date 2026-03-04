

// export type ModuleRiskLevel = 'low' | 'medium' | 'high';
// export type UserStatus = 'active' | 'suspended';

// export interface DashboardModule {
//   code: string;
//   title: string;
//   subtitle: string;
//   domain: string;
//   riskLevel: ModuleRiskLevel;
// }

// export interface DashboardOverviewResponse {
//   greeting: string;
//   activeSessions: number;
//   securityScore: number;
//   riskLevel: string;
//   allowedModules: number;
//   modules: DashboardModule[];
//   zeroTrustNotice: string;
// }

// export interface IamDirectoryUser {
//   id: number;
//   fullName: string;
//   email: string;
//   department: string;
//   source: 'Google Workspace' | 'Microsoft 365' | 'Manual';
//   status: UserStatus;
// }

// export interface User {
//   id: number;
//   full_name: string;
//   email: string;
//   department: string;
// //   source: string;
//   status: UserStatus;
// }

// export interface RoleFunction {
//   id: string;
//   roleName: string;
//   roleCount: number;
//   functions: string[];
// }

// export interface PolicyRule {
//   id: string;
//   title: string;
//   type: 'Device Health' | 'Context-Based' | 'Time-Based' | 'Location-Based';
//   severity: 'critical' | 'high' | 'medium';
//   expression: string;
//   action: 'DENY' | 'ALERT' | 'REQUIRE_MFA';
// }

// export interface IamCoreResponse {
//   userDirectory: {
//     total: number;
//     active: number;
//     suspended: number;
//     // byDepartment: Record<string, number>;
//     entries: User[];
//   };
//   rbac: {
//     roles: RoleFunction[];
//     totalUsersInRoles: number;
//   };
//   policyEngine: {
//     total: number;
//     bySeverity: Record<'critical' | 'high' | 'medium', number>;
//     rules: PolicyRule[];
//   };
// }