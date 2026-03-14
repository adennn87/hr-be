import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity("leave_requests")
export class LeaveRequest {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({ type: "date" })
    startDate: Date;

    @Column({ type: "date" })
    endDate: Date;

    @Column({
        type: "enum",
        enum: ["ANNUAL", "SICK", "UNPAID", "OTHER"],
    })
    type: string;

    @Column({ nullable: true })
    reason: string;

    @Column({
        type: "enum",
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
    })
    status: string;

    @Column({ nullable: true })
    rejectReason: string;

    @CreateDateColumn()
    createdAt: Date;
}