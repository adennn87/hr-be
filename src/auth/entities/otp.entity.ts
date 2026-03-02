import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column()
  expired_at: Date;
}