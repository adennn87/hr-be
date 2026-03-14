import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity'; // Import Role entity
import { AllocatedAsset } from 'src/allocated-assets/entities/allocated-asset.entity';
import { WorkScheduleWeek } from 'src/weekly-schedules/entities/work_schedule_weeks.entity';
import { PasswordResetToken } from 'src/auth/entities/password-reset-token.entity';
import { Department } from 'src/department/entities/department.entity';

export enum Position {
  CEO = 'CEO',
  Manager = 'Manager',
  Employee = 'Employee',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'citizen_id', nullable: true })
  citizen_Id: string;

  @ManyToOne(() => Department, (department) => department.users, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'position', type: 'enum', enum: Position })
  position: Position;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'taxcode', nullable: true })
  taxCode: string;

  @Column({ default: 'is_active' })
  status: string;

  @OneToMany(() => AllocatedAsset, (aa) => aa.user)
  allocatedAssets: AllocatedAsset[];

  @OneToMany(() => WorkScheduleWeek, (wsw) => wsw.user)
  workScheduleWeeks: WorkScheduleWeek[];

@ManyToOne(() => Role, { nullable: false })
@JoinColumn({ name: 'role_id' })
role: Role;

  @OneToMany(() => PasswordResetToken, (token) => token.user)
  passwordResetTokens: PasswordResetToken[];
}