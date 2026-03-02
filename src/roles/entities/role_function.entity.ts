// role-function.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Role } from './role.entity';
import { Function} from '../../function/entities/function.entity';

@Entity('role_function')
@Unique(['role', 'function']) // tránh trùng role-function
export class RoleFunction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.roleFunctions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'user_count', default: 0 })
  roleCount: number; // Số lượng người dùng có role này

  @ManyToOne(() => Function, (func) => func.roleFunctions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'function_id' })
  function: Function;

  @CreateDateColumn()
  createdAt: Date;
}