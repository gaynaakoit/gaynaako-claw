import { IsOptional, IsNumber, IsArray, IsBoolean, IsString } from 'class-validator';

export class ExperienceInfoDto {
  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsNumber()
  completedProjectsCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  majorClients?: string[];

  @IsOptional()
  @IsBoolean()
  publicSectorExperience?: boolean;

  @IsOptional()
  @IsBoolean()
  internationalExperience?: boolean;
}