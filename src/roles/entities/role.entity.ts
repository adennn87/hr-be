import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Function } from '../../function/entities/function.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Ví dụ: 'Quản trị viên', 'Nhân sự'

  @Column({ unique: true })
  code: string; // Ví dụ: 'ADMIN', 'HR'

  @Column({ nullable: true })
  description: string;

  // Quan hệ N-N với Function: Một Role có nhiều Function và ngược lại
  @ManyToMany(() => Function, (func) => func.roles)
  @JoinTable({
    name: 'role_functions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'function_id', referencedColumnName: 'id' }
  })
  functions: Function[];

  // Quan hệ 1-N với User: Một Role có thể được gán cho nhiều User
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}