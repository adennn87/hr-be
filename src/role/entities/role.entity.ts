import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { RoleFunction } from '../../role-function/entities/role-function.entity';
import { User } from '../../user/entities/user.entity';
import { OneToMany } from 'typeorm';


@Entity('roles')
export class Role {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // 👇 Quan hệ ngược lại
  @OneToOne(() => User, (user) => user.role)
  user: User;

  @OneToMany(() => RoleFunction, (roleFunction) => roleFunction.role)
  roleFunctions: RoleFunction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
