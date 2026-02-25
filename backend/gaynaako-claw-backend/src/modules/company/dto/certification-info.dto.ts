import {
    IsOptional,
    IsArray,
    ValidateNested,
    IsString,
    IsNumber,
    IsDateString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class CertificationDto {
    @IsString()
    name: string;
  
    @IsString()
    issuer: string;
  
    @IsNumber()
    year: number;
  
    @IsOptional()
    @IsDateString()
    expiryDate?: Date;
  
    @IsOptional()
    @IsString()
    credentialId?: string;
  }
  
  export class CertificationInfoDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CertificationDto)
    certifications?: CertificationDto[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    qualityStandards?: string[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    securityCompliance?: string[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cloudPartnerships?: string[];
  }