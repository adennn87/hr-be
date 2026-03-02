import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('iam_policy_rules')
export class IamPolicyRuleEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'Device Health' | 'Context-Based' | 'Time-Based' | 'Location-Based';

  @Column()
  severity: 'critical' | 'high' | 'medium';

  @Column()
  expression: string;

  @Column()
  action: 'DENY' | 'ALERT' | 'REQUIRE_MFA';
}