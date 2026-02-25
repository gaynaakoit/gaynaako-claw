import {
    IsString,
    IsOptional,
    IsNumber,
    IsEnum,
    IsBoolean,
    IsArray,
    IsUrl,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class GeoCoordinatesDto {
    @IsNumber()
    lat: number;
  
    @IsNumber()
    lng: number;
  }
  
  export class GeneralInfoDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    legalName?: string;
  
    @IsOptional()
    @IsNumber()
    yearFounded?: number;
  
    @IsOptional()
    @IsEnum(['startup', 'sme', 'enterprise'])
    companySize?: 'startup' | 'sme' | 'enterprise';
  
    @IsOptional()
    @IsEnum(['private', 'public', 'ngo'])
    ownershipType?: 'private' | 'public' | 'ngo';
  
    @IsOptional()
    @IsUrl()
    website?: string;
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => GeoCoordinatesDto)
    geoCoordinates?: GeoCoordinatesDto;
  
    @IsOptional()
    @IsBoolean()
    remoteCapability?: boolean;
  }