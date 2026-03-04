import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AllocationStatus } from './create-allocated-asset.dto';


export class UpdateAllocatedAssetDto {
  @IsOptional()
  @IsEnum(AllocationStatus)
  status?: AllocationStatus;

  @IsOptional()
  @IsString()
  note?: string;
}