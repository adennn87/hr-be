import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AllocatedAssetsService } from './allocated-assets.service';
import { CreateAllocatedAssetDto } from './dto/create-allocated-asset.dto';
import { UpdateAllocatedAssetDto } from './dto/update-allocated-asset.dto';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('allocated-assets')
export class AllocatedAssetsController {
  constructor(private readonly allocatedAssetsService: AllocatedAssetsService) {}
  // Tạo tài sản
  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    return await this.allocatedAssetsService.createAsset(createAssetDto);
  }

  // Lấy danh sách asset
  @Get()
  findAllAsset() {
    return this.allocatedAssetsService.findAllAsset();
  }

  // Lấy 1 asset
  @Get(':id')
  findOneAsset(@Param('id') id: string) {
    return this.allocatedAssetsService.findOneAsset(id);
  }

  // Update asset
  @Patch(':id')
  updateAsset(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.allocatedAssetsService.updateAsset(id, updateAssetDto);
  }

  // Soft delete asset
  @Delete(':id')
  removeAsset(@Param('id') id: string) {
    return this.allocatedAssetsService.removeAssets(id);
  }


  // Cấp phát tài sản
  @Post('allocate')
  createAllocatedAsset(
    @Body() createAllocatedAssetDto: CreateAllocatedAssetDto,
  ) {
    return this.allocatedAssetsService.createAllocatedAsset(
      createAllocatedAssetDto,
    );
  }

  // Lấy danh sách cấp phát (có thể filter status)
  @Get('allocate/list')
  findAllAllocated(@Query('status') status?: string) {
    return this.allocatedAssetsService.findAll(status);
  }

  // Lấy 1 lịch sử cấp phát
  @Get('allocate/:id')
  findOneAllocated(@Param('id') id: string) {
    return this.allocatedAssetsService.findOne(id);
  }

  // Update trạng thái cấp phát (return, lost, damaged)
  @Patch('allocate/:id')
  updateAllocatedAsset(
    @Param('id') id: string,
    @Body() updateAllocatedAssetDto: UpdateAllocatedAssetDto,
  ) {
    return this.allocatedAssetsService.updateAllocatedAsset(
      id,
      updateAllocatedAssetDto,
    );
  }
}
