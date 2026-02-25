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
  seniorEngineersCount?: number;

  @IsOptional()
  @IsNumber()
  projectManagersCount?: number;

  @IsOptional()
  @IsNumber()
  certifiedEngineersCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  developmentMethodologies?: string[]; // Agile, Scrum, etc.

  @IsOptional()
  @IsNumber()
  devOpsMaturityLevel?: number; // 1-5

  @IsOptional()
  @IsNumber()
  cybersecurityLevel?: number; // 1-5

  @IsOptional()
  @IsNumber()
  cloudMaturityLevel?: number; // 1-5

  @IsOptional()
  @IsNumber()
  aiReadinessScore?: number; // 0-100
}