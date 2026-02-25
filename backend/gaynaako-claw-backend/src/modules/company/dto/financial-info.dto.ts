import { IsOptional, IsNumber, IsString } from 'class-validator';

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
}