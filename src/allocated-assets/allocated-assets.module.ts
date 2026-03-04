import { Module } from '@nestjs/common';
import { AllocatedAssetsService } from './allocated-assets.service';
import { AllocatedAssetsController } from './allocated-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocatedAsset } from './entities/allocated-asset.entity';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AllocatedAsset])],
  controllers: [AllocatedAssetsController],
  providers: [AllocatedAssetsService],
  exports: [AllocatedAssetsService],
})
export class AllocatedAssetsModule {}
