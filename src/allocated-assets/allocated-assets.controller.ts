import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AllocatedAssetsService } from './allocated-assets.service';
import { CreateAllocatedAssetDto } from './dto/create-allocated-asset.dto';
import { UpdateAllocatedAssetDto } from './dto/update-allocated-asset.dto';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FunctionGuard } from 'src/auth/guards/function.guard';
import { RequireFunction } from 'src/auth/decorators/require-function.decorator';
import { get } from 'http';

// @UseGuards(JwtAuthGuard, FunctionGuard)
@Controller('allocated-assets')
export class AllocatedAssetsController {
  constructor(private readonly allocatedAssetsService: AllocatedAssetsService) {}

  // Tạo tài sản
  @RequireFunction('ASSET_CREATE')
  @Post()
  createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.allocatedAssetsService.createAsset(createAssetDto);
  }

  // Lấy danh sách asset
  @RequireFunction('ASSET_VIEW')
  @Get()
  findAllAsset() {
    return this.allocatedAssetsService.findAllAsset();
  }

  // Lấy 1 asset
  @RequireFunction('ASSET_VIEW')
  @Get(':id')
  findOneAsset(@Param('id') id: string) {
    return this.allocatedAssetsService.findOneAsset(id);
  }

  // Update asset
  @RequireFunction('ASSET_UPDATE')
  @Patch(':id')
  updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.allocatedAssetsService.updateAsset(id, updateAssetDto);
  }

  // Soft delete asset
  @RequireFunction('ASSET_DELETE')
  @Delete(':id')
  removeAsset(@Param('id') id: string) {
    return this.allocatedAssetsService.removeAssets(id);
  }

  // Cấp phát tài sản
  // @RequireFunction('ASSET_ALLOCATE')
  @Post('allocate')
  createAllocatedAsset(@Body() dto: CreateAllocatedAssetDto) {
    return this.allocatedAssetsService.createAllocatedAsset(dto);
  }

  // Danh sách cấp phát
  @RequireFunction('ASSET_ALLOCATE_VIEW')
  @Get('allocate/list')
  findAllAllocated(@Query('status') status?: string) {
    return this.allocatedAssetsService.findAll(status);
  }

  // Lấy 1 lịch sử cấp phát
  @RequireFunction('ASSET_ALLOCATE_VIEW')
  @Get('allocate/:id')
  findOneAllocated(@Param('id') id: string) {
    return this.allocatedAssetsService.findOne(id);
  }

  // Update trạng thái cấp phát
  @RequireFunction('ASSET_ALLOCATE_UPDATE')
  @Patch('allocate/:id')
  updateAllocatedAsset(
    @Param('id') id: string,
    @Body() updateAllocatedAssetDto: UpdateAllocatedAssetDto,
  ) {
    return this.allocatedAssetsService.updateAllocatedAsset(id, updateAllocatedAssetDto);
  }

  @Get('allocate/me/:userId')
  async forMe(@Param('userId') userId: string) {
    return await this.allocatedAssetsService.forMe(userId);
  }

}