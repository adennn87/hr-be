import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('adjustment_types')
export class AdjustmentType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
  // Bonus, Insurance, Tax, Lunch Allowance

  @Column({
    type: 'enum',
    enum: ['ADD', 'DEDUCT'],
  })
  type: 'ADD' | 'DEDUCT';

  @Column({ nullable: true })
  description: string;
}