import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAdjustment } from "./user-adjusments.entity";

@Entity('payrolls')
export class Payroll {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  month: string;

  @Column()
  workingDays: number;

  @Column()
  salaryPerDay: number;

  @Column()
  baseSalary: number;

  @Column()
  finalSalary: number;

  @CreateDateColumn()
  createdAt: Date;
}