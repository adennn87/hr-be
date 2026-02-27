import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Sửa quan trọng: Ánh xạ 'fullName' vào cột 'full_name'
  @Column({ name: 'full_name' }) 
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Sửa quan trọng: Ánh xạ 'isActive' vào cột 'is_active'
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  // Các trường khác từ RegisterForm
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
}