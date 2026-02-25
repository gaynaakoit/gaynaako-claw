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
    @IsString()
    registrationNumber?: string;
  
    @IsOptional()
    @IsString()
    taxId?: string;
  
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
    email?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    linkedin?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    mission?: string;
  
    @IsOptional()
    @IsString()
    vision?: string;
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => GeoCoordinatesDto)
    geoCoordinates?: GeoCoordinatesDto;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    operatingCountries?: string[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    regionalPresence?: string[];
  
    @IsOptional()
    @IsBoolean()
    remoteCapability?: boolean;
  
    @IsOptional()
    @IsString()
    timeZone?: string;
  }