import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  functionIds?: string[];
}