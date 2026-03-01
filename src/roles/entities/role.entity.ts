// role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleFunction } from './role_function.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // ADMIN, USER, EDITOR...

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoleFunction, (rf) => rf.role)
  roleFunctions: RoleFunction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}