import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyActivityLog } from './entities/company-activity-log.entity';

@Injectable()
export class CompanyService {
  constructor(
        @InjectRepository(Company)
        private repo: Repository<Company>,
        @InjectRepository(CompanyActivityLog)
        private readonly activityRepo: Repository<CompanyActivityLog>
  ) {}

  async create(dto: CreateCompanyDto) {
    const company = this.repo.create(dto);
    Object.assign(company, this.calculateScores(company));
    return this.repo.save(company);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const company = await this.repo.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto, currentUserId: string) {
    const company = await this.findOne(id);
  
    // Garder un snapshot de l'état avant modification
    const beforeUpdate = { ...company };
  
    Object.assign(company, dto);
    Object.assign(company, this.calculateScores(company));
  
    const updatedCompany = await this.repo.save(company);
  
    // Enregistrer dans activity log
    await this.activityRepo.save({
      companyId: company.id,
      changes: {
        before: beforeUpdate,
        after: dto,
      },
      updatedBy: currentUserId,
    });
  
    return updatedCompany;
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }

  private calculateScores(company: Company) {
    const sections = [
      company.generalInfo,
      company.sectorInfo,
      company.financialInfo,
      company.experienceInfo,
      company.certificationInfo,
      company.technicalInfo,
      company.esgInfo,
    ];
  
    const weights = [15, 15, 20, 15, 10, 15, 10]; // Pondération stratégique
    let profileCompletenessScore = 0;
    sections.forEach((s, idx) => { if (s && Object.keys(s).length) profileCompletenessScore += weights[idx]; });
  
    const credibilityScore =
      (company.experienceInfo?.yearsOfExperience || 0) * 2 +
      (company.certificationInfo?.certifications?.length || 0) * 5 +
      (company.technicalInfo?.aiReadinessScore || 0) > 0 ? 10 : 0;
  
    const tenderEligibilityScore =
      (company.financialInfo?.maxProjectBudget || 0) > 50000 ? 30 : 10;
  
    const riskScore = company.financialInfo?.financialRating === 'AAA' ? 5 : 20;
    const aiCompatibilityScore = company.technicalInfo?.aiReadinessScore || 0;
  
    return { profileCompletenessScore, credibilityScore, tenderEligibilityScore, riskScore, aiCompatibilityScore };
  }

  async filterCompanies(filter: {
    country?: string;
    primarySector?: string;
    minRevenue?: number;
    maxRevenue?: number;
    minScore?: number;
    maxScore?: number;
  }) {
    const qb = this.repo.createQueryBuilder('company');
  
    if (filter.country) {
      qb.andWhere("company.generalInfo->>'country' = :country", { country: filter.country });
    }
  
    if (filter.primarySector) {
      qb.andWhere("company.sectorInfo->>'primarySector' = :primarySector", { primarySector: filter.primarySector });
    }
  
    if (filter.minRevenue) {
      qb.andWhere("CAST(company.financialInfo->>'annualRevenue' AS INT) >= :minRevenue", { minRevenue: filter.minRevenue });
    }
  
    if (filter.maxRevenue) {
      qb.andWhere("CAST(company.financialInfo->>'annualRevenue' AS INT) <= :maxRevenue", { maxRevenue: filter.maxRevenue });
    }
  
    if (filter.minScore) {
      qb.andWhere("company.profileCompletenessScore >= :minScore", { minScore: filter.minScore });
    }
  
    if (filter.maxScore) {
      qb.andWhere("company.profileCompletenessScore <= :maxScore", { maxScore: filter.maxScore });
    }
  
    return qb.getMany();
  }
}