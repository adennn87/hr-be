import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('functions')
export class Function {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Tên chức năng, ví dụ: 'Quản lý nhân viên'

  @Column({ unique: true })
  code: string; // Mã chức năng để check code, ví dụ: 'USER_MANAGEMENT'

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Role, (role) => role.functions)
  roles: Role[];
}