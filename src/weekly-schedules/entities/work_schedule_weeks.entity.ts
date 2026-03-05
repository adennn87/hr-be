import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkScheduleDay } from "./work_schedule_days.entity";
import { User } from "src/users/entities/user.entity";

@Entity('work_schedule_weeks')
@Index(['user', 'weekStartDate'], { unique: true })
export class WorkScheduleWeek {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workScheduleWeeks)
  user: User;

  @Column({ type: 'date' })
  weekStartDate: Date; 

  @Column({ type: 'date' })
  weekEndDate: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;

  @OneToMany(() => WorkScheduleDay, (day) => day.week, {
    cascade: true,
  })
  days: WorkScheduleDay[];

  @CreateDateColumn()
  createdAt: Date;
}