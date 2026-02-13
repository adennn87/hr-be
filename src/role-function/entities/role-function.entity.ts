import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Function } from '../../function/entities/function.entity';

@Entity('role_functions')
export class RoleFunction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleId: string;

  @Column()
  functionId: string;

  @ManyToOne(() => Role, (role) => role.roleFunctions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Function, (func) => func.roleFunctions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'functionId' })
  function: Function;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
