import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAllocatedAssetDto } from './dto/create-allocated-asset.dto';
import { UpdateAllocatedAssetDto } from './dto/update-allocated-asset.dto';
import { CreateAssetDto } from './dto/create-asset.dto';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Asset, AssetStatus } from './entities/asset.entity';
import { AllocatedAsset } from './entities/allocated-asset.entity';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AllocatedAssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AllocatedAsset)
    private readonly allocatedAssetRepository: Repository<AllocatedAsset>,
    private readonly dataSource: DataSource,
  ) { }

  async createAsset(createAssetDto: CreateAssetDto) {
    const { serialNumber, assetCode, ...rest } = createAssetDto;

    // 🔎 Check trùng serial
    const existingSerial = await this.assetRepository.findOne({
      where: { serialNumber },
    });

    if (existingSerial) {
      throw new BadRequestException('Serial number already exists');
    }

    const existingCode = await this.assetRepository.findOne({
      where: { assetCode },
    });

    if (existingCode) {
      throw new BadRequestException('Asset code already exists');
    }

    // 🛠 Tạo asset mới
    const asset = this.assetRepository.create({
      ...rest,
      serialNumber,
      assetCode,
      status: AssetStatus.AVAILABLE,
    });
    await this.assetRepository.save(asset);
    return asset;
  }

  async findAllAsset() {
    return this.allocatedAssetRepository.find({
      relations: ['asset', 'user'],
    });
  }

  async findOneAsset(id: string) {
    return this.allocatedAssetRepository.findOne({
      where: { id },
      relations: ['asset', 'user'],
    });
  }

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto) {
    const asset = await this.assetRepository.findOne({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    // ❌ Không cho update nếu asset đang được cấp
    if (asset.status === AssetStatus.ALLOCATED) {
      throw new BadRequestException(
        'Cannot update asset while it is allocated',
      );
    }

    const { serialNumber, assetCode, ...rest } = updateAssetDto;

    // 🔎 Nếu đổi serial thì check trùng
    if (serialNumber && serialNumber !== asset.serialNumber) {
      const existingSerial = await this.assetRepository.findOne({
        where: { serialNumber },
      });

      if (existingSerial) {
        throw new BadRequestException('Serial number already exists');
      }

      asset.serialNumber = serialNumber;
    }

    // 🔎 Nếu đổi assetCode thì check trùng
    if (assetCode && assetCode !== asset.assetCode) {
      const existingCode = await this.assetRepository.findOne({
        where: { assetCode },
      });

      if (existingCode) {
        throw new BadRequestException('Asset code already exists');
      }

      asset.assetCode = assetCode;
    }

    // 🛠 Update các field còn lại
    Object.assign(asset, rest);

    await this.assetRepository.save(asset);

    return asset;
  }

  async removeAssets(id: string) {
    const asset = await this.assetRepository.findOne({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    if (asset.status === AssetStatus.ALLOCATED) {
      throw new BadRequestException(
        'Cannot delete asset while it is allocated',
      );
    }

    await this.assetRepository.softDelete(id);

    return { message: 'Asset deleted successfully' };
  }

  async createAllocatedAsset(dto: CreateAllocatedAssetDto) {
    const { userId, assetId, allocatedDate, note } = dto;

    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const asset = await manager.findOne(Asset, { where: { id: assetId } });
      if (!asset) {
        throw new NotFoundException('Asset not found');
      }

      if (asset.status === AssetStatus.ALLOCATED) {
        throw new BadRequestException('Asset is already allocated');
      }

      const allocated = manager.create(AllocatedAsset, {
        user,
        asset,
        allocatedDate,
        status: 'allocated',
        note,
      });

      asset.status = AssetStatus.ALLOCATED;

      await manager.save(asset);
      await manager.save(allocated);

      return allocated;
    });
  }

  async updateAllocatedAsset(
    id: string,
    dto: UpdateAllocatedAssetDto,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const allocated = await manager.findOne(AllocatedAsset, {
        where: { id },
        relations: ['asset'],
      });

      if (!allocated) {
        throw new NotFoundException('Allocated asset not found');
      }

      if (dto.status) {
        allocated.status = dto.status;

        if (dto.status === 'returned') {
          allocated.returnedDate = new Date();
          allocated.asset.status = AssetStatus.AVAILABLE;
        }

        if (dto.status === 'lost') {
          allocated.asset.status = AssetStatus.RETIRED;
        }

        if (dto.status === 'damaged') {
          allocated.asset.status = AssetStatus.MAINTENANCE;
        }

        await manager.save(allocated.asset);
      }

      if (dto.note) {
        allocated.note = dto.note;
      }

      await manager.save(allocated);

      return allocated;
    });
  }

  async findAll(status?: string) {
    const whereCondition = status ? { status } : {};

    return this.allocatedAssetRepository.find({
      where: whereCondition,
      relations: ['user', 'asset'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const allocated = await this.allocatedAssetRepository.findOne({
      where: { id },
      relations: ['user', 'asset'],
    });

    if (!allocated) {
      throw new NotFoundException('Allocated asset not found');
    }
    return allocated;
  }

  async forMe(userId: string) {
    const allocatedAssets = await this.allocatedAssetRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['asset'],
      order: {
        createdAt: 'DESC',
      },
    });

    return allocatedAssets;
  }
}
