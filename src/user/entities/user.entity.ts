import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

export enum gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: gender;

  @Column()
  citizenIdentification: string;

  @Column()
  taxcode: string;

  @Column()
  address: string;

  @Column()
  department: string;

  @Column()
  password: string;

  @Column()
  device: string;

  // 👇 FK
  @Column()
  roleId: string;

  // 👇 Quan hệ 1-1
  @OneToOne(() => Role)
  @JoinColumn({ name: 'roleId' }) // bên giữ khóa ngoại
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
