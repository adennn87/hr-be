import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) 
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  role_id: number;

  @Column({ nullable: true })
  department_id: number;

  @Column({ nullable: true })
  branch_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}