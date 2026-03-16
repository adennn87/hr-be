import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { AdjustmentType } from "./AdjustmentType.entity";

@Entity('user_adjustments')
export class UserAdjustment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.adjustments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => AdjustmentType)
  type: AdjustmentType;

  @Column('decimal')
  amount: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: true })
  isActive: boolean;
}