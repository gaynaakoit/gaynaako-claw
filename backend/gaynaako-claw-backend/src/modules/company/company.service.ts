import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

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

  async update(id: string, dto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    Object.assign(company, dto);
    Object.assign(company, this.calculateScores(company));
    return this.repo.save(company);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }

  private calculateScores(company: Company) {
    let completeness = 0;

    const sections = [
      company.generalInfo,
      company.sectorInfo,
      company.financialInfo,
      company.experienceInfo,
      company.certificationInfo,
      company.technicalInfo,
      company.esgInfo,
    ];

    sections.forEach(s => {
      if (s && Object.keys(s).length > 0) completeness += 15;
    });

    const credibility =
      (company.experienceInfo?.yearsOfExperience || 0) +
      (company.certificationInfo?.certifications?.length || 0) * 5 +
      ((company.technicalInfo?.aiReadinessScore || 0) > 0 ? 10 : 0);

    const eligibility =
      (company.financialInfo?.maxProjectBudget || 0) > 50000 ? 30 : 10;

    const risk = company.financialInfo?.financialRating === 'AAA' ? 5 : 20;

    const aiCompatibility = company.technicalInfo?.aiReadinessScore || 0;

    return {
      profileCompletenessScore: completeness,
      credibilityScore: credibility,
      tenderEligibilityScore: eligibility,
      riskScore: risk,
      aiCompatibilityScore: aiCompatibility,
    };
  }
}