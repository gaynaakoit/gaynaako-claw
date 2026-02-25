import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyActivityLog } from './entities/company-activity-log.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyActivityLog])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
