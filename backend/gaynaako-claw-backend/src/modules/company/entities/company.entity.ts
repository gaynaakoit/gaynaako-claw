import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { GeneralInfoDto } from '../dto/general-info.dto';
import { SectorInfoDto } from '../dto/sector-info.dto';
import { FinancialInfoDto } from '../dto/financial-info.dto';
import { ExperienceInfoDto } from '../dto/experience-info.dto';
import { CertificationInfoDto } from '../dto/certification-info.dto';
import { TechnicalInfoDto } from '../dto/technical-info.dto';
import { EsgInfoDto } from '../dto/esg-info.dto';
import { TenderMatch } from '../../tender-scout/entities/tender-match.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  generalInfo?: GeneralInfoDto;

  @Column('jsonb', { nullable: true })
  sectorInfo?: SectorInfoDto;

  @Column('jsonb', { nullable: true })
  financialInfo?: FinancialInfoDto;

  @Column('jsonb', { nullable: true })
  experienceInfo?: ExperienceInfoDto;

  @Column('jsonb', { nullable: true })
  certificationInfo?: CertificationInfoDto;

  @Column('jsonb', { nullable: true })
  technicalInfo?: TechnicalInfoDto;

  @Column('jsonb', { nullable: true })
  esgInfo?: EsgInfoDto;

  // 🧠 Intelligence / Scores
  @Column({ default: 0 })
  profileCompletenessScore: number;

  @Column({ default: 0 })
  credibilityScore: number;

  @Column({ default: 0 })
  tenderEligibilityScore: number;

  @Column({ default: 0 })
  riskScore: number;

  @Column({ default: 0 })
  aiCompatibilityScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  // =====================================
  // RELATION TENDERMATCH
  // =====================================

  @OneToMany(() => TenderMatch, (match) => match.company)
  matches: TenderMatch[];
}