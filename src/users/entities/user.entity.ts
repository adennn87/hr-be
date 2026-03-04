import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity'; // Import Role entity
import { AllocatedAsset } from 'src/allocated-assets/entities/allocated-asset.entity';

export enum Department {
  HR = 'HR',
  IT = 'IT',
  Finance = 'Finance',
  Marketing = 'Marketing',
  Sales = 'Sales',
}

export enum Position {
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

  @Column({ type: 'enum', enum: Department, nullable: true })
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

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}