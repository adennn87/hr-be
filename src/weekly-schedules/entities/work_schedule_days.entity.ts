import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkScheduleWeek } from "./work_schedule_weeks.entity";

@Entity('work_schedule_days')
export class WorkScheduleDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkScheduleWeek, (week) => week.days, {
    onDelete: 'CASCADE',
  })
  week: WorkScheduleWeek;

  @Column({ type: 'int' })
  dayOfWeek: number; 

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ default: false })
  isWorking: boolean;
}