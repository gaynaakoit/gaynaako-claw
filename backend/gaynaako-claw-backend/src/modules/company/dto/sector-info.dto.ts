import { IsOptional, IsString, IsArray } from 'class-validator';

export class SectorInfoDto {
  @IsOptional()
  @IsString()
  primarySector?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondarySectors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologiesUsed?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  innovationAreas?: string[];
}