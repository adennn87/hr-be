import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity'; // Import Role entity

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

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'taxcode', nullable: true })
  taxCode: string;

  @Column({ default: 'is_active' })
  status: string;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}