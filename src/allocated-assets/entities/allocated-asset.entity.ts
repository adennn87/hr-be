import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Asset } from './asset.entity';
import { Delete } from '@nestjs/common';


@Entity('allocated_assets')
export class AllocatedAsset {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 👤 Nhân viên được cấp tài sản
    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    // 💻 Tài sản được cấp
    @ManyToOne(() => Asset, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'asset_id' })
    asset: Asset;

    // 📅 Ngày cấp
    @Column({ name: 'allocated_date', type: 'date' })
    allocatedDate: Date;

    // 📅 Ngày trả (nullable)
    @Column({ name: 'returned_date', type: 'date', nullable: true })
    returnedDate: Date;

    // 📌 Trạng thái cấp phát
    @Column({
        type: 'enum',
        enum: ['allocated', 'returned', 'lost', 'damaged'],
        default: 'allocated',
    })
    status: string;

    @OneToMany(() => AllocatedAsset, (aa) => aa.asset)
    allocatedAssets: AllocatedAsset[];

    // 📝 Ghi chú
    @Column({ type: 'text', nullable: true })
    note: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}