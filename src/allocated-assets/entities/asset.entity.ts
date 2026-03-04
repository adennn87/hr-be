import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { AllocatedAsset } from '../../allocated-assets/entities/allocated-asset.entity';
import { Delete } from '@nestjs/common';

export enum AssetStatus {
    AVAILABLE = 'available',
    ALLOCATED = 'allocated',
    MAINTENANCE = 'maintenance',
    RETIRED = 'retired',
}

@Entity('assets')
export class Asset {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Tên tài sản (VD: Macbook Pro M1)
    @Column()
    name: string;

    // Loại tài sản (Laptop, Monitor, Phone...)
    @Column()
    category: string;

    // Serial number
    @Column({ unique: true })
    serialNumber: string;

    // Mã tài sản nội bộ công ty
    @Column({ unique: true })
    assetCode: string;

    // Hãng sản xuất
    @Column({ nullable: true })
    brand: string;

    // Model
    @Column({ nullable: true })
    model: string;

    // Ngày mua
    @Column({ type: 'date', nullable: true })
    purchaseDate: Date;

    // Giá mua
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
    purchasePrice: number;

    // Trạng thái hiện tại
    @Column({
        type: 'enum',
        enum: AssetStatus,
        default: AssetStatus.AVAILABLE,
    })
    status: AssetStatus;

    // Ghi chú
    @Column({ type: 'text', nullable: true })
    note: string;

    // Lịch sử cấp phát
    @OneToMany(() => AllocatedAsset, (aa) => aa.asset)
    allocatedAssets: AllocatedAsset[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}