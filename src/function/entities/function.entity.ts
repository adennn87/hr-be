
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleFunction } from '../../roles/entities/role_function.entity';

@Entity('function')
export class Function {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string; 
  // VD: CREATE_USER, DELETE_USER, VIEW_DASHBOARD

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoleFunction, (rf) => rf.function)
  roleFunctions: RoleFunction;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}