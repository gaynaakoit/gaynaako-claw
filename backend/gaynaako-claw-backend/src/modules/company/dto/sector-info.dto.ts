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
  industryCodes?: string[]; // NAF, NAICS, etc.

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  products?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologiesUsed?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  innovationAreas?: string[];
}