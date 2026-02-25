import { IsOptional, IsNumber, IsArray, IsString } from 'class-validator';

export class TechnicalInfoDto {
  @IsOptional()
  @IsNumber()
  totalEmployees?: number;

  @IsOptional()
  @IsNumber()
  technicalTeamSize?: number;

  @IsOptional()
  @IsNumber()
  devOpsMaturityLevel?: number;

  @IsOptional()
  @IsNumber()
  aiReadinessScore?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];
}