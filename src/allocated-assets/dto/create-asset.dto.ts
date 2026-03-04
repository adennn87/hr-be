import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AssetStatus } from '../entities/asset.entity';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  assetCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  purchasePrice?: number;

  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @IsOptional()
  @IsString()
  note?: string;
}