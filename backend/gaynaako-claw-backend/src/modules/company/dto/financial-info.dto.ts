import { IsOptional, IsNumber, IsString, IsArray } from 'class-validator';

export class FinancialInfoDto {
  @IsOptional()
  @IsNumber()
  annualRevenue?: number;

  @IsOptional()
  @IsNumber()
  availableBudget?: number;

  @IsOptional()
  @IsNumber()
  maxProjectBudget?: number;

  @IsOptional()
  @IsNumber()
  minProjectBudget?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  financialRating?: string; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fundingSources?: string[]; // self-funded, VC, grants

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  insuranceCoverage?: string[];
}