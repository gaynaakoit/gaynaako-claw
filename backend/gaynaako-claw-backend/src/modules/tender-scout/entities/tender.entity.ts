import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { TenderMatch } from './tender-match.entity';

export enum TenderStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  AWARDED = 'AWARDED',
}

@Entity('tenders')
@Index(['sector', 'deadline'])
@Index(['country', 'region'])
export class Tender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =====================================
  // BASIC INFORMATION
  // =====================================

  @Index()
  @Column({ length: 500 })
  title: string;

  @Column({ length: 255, nullable: true })
  referenceNumber: string;

  @Index()
  @Column({ length: 255 })
  organization: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // =====================================
  // DATES
  // =====================================

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  publicationDate: Date;

  @Index()
  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'timestamp', nullable: true })
  openingDate: Date;

  // =====================================
  // CLASSIFICATION
  // =====================================

  @Index()
  @Column({ nullable: true })
  sector: string; // IT, Construction, Health, Agriculture...

  @Column({ type: 'simple-array', nullable: true })
  subSectors: string[];

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  procurementMethod: string; // Open, Restricted, Direct...

  @Column({ nullable: true })
  contractType: string; // Services, Works, Supplies

  // =====================================
  // FINANCIAL DATA
  // =====================================

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  estimatedBudget: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  fundingSource: string; // World Bank, State Budget...

  // =====================================
  // FILES & LINKS
  // =====================================

  @Column({ type: 'text', nullable: true })
  pdfUrl: string;

  @Column({ type: 'text', nullable: true })
  sourceUrl: string;

  @Index()
  @Column()
  source: string; // achatspublics.sn, etc.

  // =====================================
  // DATA QUALITY & PROCESSING
  // =====================================

  @Column({ default: false })
  isProcessed: boolean; // matching déjà exécuté ?

  @Column({ default: false })
  isFlagged: boolean; // incohérence détectée

  @Column({ type: 'int', default: 0 })
  qualityScore: number; // score qualité extraction OpenClaw

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>; // raw OpenClaw payload

  // =====================================
  // STATUS MANAGEMENT
  // =====================================

  @Index()
  @Column({
    type: 'enum',
    enum: TenderStatus,
    default: TenderStatus.ACTIVE,
  })
  status: TenderStatus;

  @Column({ default: false })
  isArchived: boolean;

  // =====================================
  // DEDUPLICATION
  // =====================================

  @Index({ unique: true })
  @Column()
  hash: string;

  // =====================================
  // RELATIONS
  // =====================================

  @OneToMany(() => TenderMatch, (match) => match.tender)
  matches: TenderMatch[];

  // =====================================
  // AUDIT
  // =====================================

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // =====================================
  // SOURCE
  // =====================================

  @Column({ default: false })
  isFromOpenClaw: boolean;
}