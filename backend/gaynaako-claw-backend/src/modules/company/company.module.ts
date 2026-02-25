import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyActivityLog } from './entities/company-activity-log.entity';
import { Company } from './entities/company.entity';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyActivityLog]), MemoryModule],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
