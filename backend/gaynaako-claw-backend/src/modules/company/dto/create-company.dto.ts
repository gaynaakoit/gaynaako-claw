import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { GeneralInfoDto } from './general-info.dto';
import { SectorInfoDto } from './sector-info.dto';
import { FinancialInfoDto } from './financial-info.dto';
import { ExperienceInfoDto } from './experience-info.dto';
import { CertificationInfoDto } from './certification-info.dto';
import { TechnicalInfoDto } from './technical-info.dto';
import { EsgInfoDto } from './esg-info.dto';

export class CreateCompanyDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => GeneralInfoDto)
  generalInfo?: GeneralInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SectorInfoDto)
  sectorInfo?: SectorInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FinancialInfoDto)
  financialInfo?: FinancialInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExperienceInfoDto)
  experienceInfo?: ExperienceInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CertificationInfoDto)
  certificationInfo?: CertificationInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TechnicalInfoDto)
  technicalInfo?: TechnicalInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EsgInfoDto)
  esgInfo?: EsgInfoDto;
}