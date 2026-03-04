import {
  IsUUID,
  IsDateString,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';

export enum AllocationStatus {
  ALLOCATED = 'allocated',
  RETURNED = 'returned',
  LOST = 'lost',
  DAMAGED = 'damaged',
}

export class CreateAllocatedAssetDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  assetId: string;

  @IsDateString()
  allocatedDate: Date;

  @IsOptional()
  @IsString()
  note?: string;
}