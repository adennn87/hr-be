import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dashboard_modules')
export class DashboardModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  domain: string;

  @Column({ name: 'risk_level' })
  riskLevel: 'low' | 'medium' | 'high';

  @Column({ name: 'is_enabled', default: true })
  isEnabled: boolean;
}