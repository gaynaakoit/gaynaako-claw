import { IsOptional, IsBoolean, IsArray, IsString } from 'class-validator';

export class EsgInfoDto {
  @IsOptional()
  @IsBoolean()
  esgPolicy?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  socialImpactActivities?: string[];

  @IsOptional()
  @IsBoolean()
  carbonNeutral?: boolean;
}