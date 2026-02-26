import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Company } from '../../company/entities/company.entity';
  import { Tender } from './tender.entity';
  
  export enum MatchStatus {
    PENDING = 'PENDING',
    ANALYZED = 'ANALYZED',
    NOTIFIED = 'NOTIFIED',
    VIEWED = 'VIEWED',
    DISMISSED = 'DISMISSED',
    ARCHIVED = 'ARCHIVED',
  }
  
  @Entity('tender_matches')
  @Index(['company', 'tender'], { unique: true })
  @Index(['score'])
  export class TenderMatch {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    // =====================================
    // RELATIONS
    // =====================================
  
    @ManyToOne(() => Company, (company) => company.matches, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'companyId' })
    company: Company;
  
    @Column()
    companyId: string;
  
    @ManyToOne(() => Tender, (tender) => tender.matches, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'tenderId' })
    tender: Tender;
  
    @Column()
    tenderId: string;
  
    // =====================================
    // AI SCORING
    // =====================================
  
    @Index()
    @Column({ type: 'int' })
    score: number; // 0 – 100
  
    @Column({ type: 'float', nullable: true })
    confidence: number; // 0.0 – 1.0 (si modèle IA avancé)
  
    @Column({ type: 'text', nullable: true })
    reasoning: string; 
    // Explication générée par l’IA :
    // "Match secteur IT + budget élevé + mots-clés digital"
  
    @Column({ type: 'json', nullable: true })
    matchedKeywords: string[];
  
    @Column({ type: 'json', nullable: true })
    scoringBreakdown: Record<string, any>;
    /*
    Exemple :
    {
      "sectorMatch": 30,
      "keywordMatch": 25,
      "budgetMatch": 10,
      "regionMatch": 15
    }
    */
  
    // =====================================
    // BUSINESS LOGIC
    // =====================================
  
    @Index()
    @Column({
      type: 'enum',
      enum: MatchStatus,
      default: MatchStatus.PENDING,
    })
    status: MatchStatus;
  
    @Column({ default: false })
    notificationSent: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    notifiedAt: Date;
  
    @Column({ default: false })
    isSavedByCompany: boolean;
  
    @Column({ default: false })
    isApplied: boolean; // entreprise a candidaté ?
  
    // =====================================
    // USER INTERACTION TRACKING
    // =====================================
  
    @Column({ type: 'timestamp', nullable: true })
    viewedAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    dismissedAt: Date;
  
    @Column({ type: 'int', default: 0 })
    viewCount: number;
  
    // =====================================
    // MODEL VERSIONING
    // =====================================
  
    @Column({ nullable: true })
    modelVersion: string; 
    // ex: "v1-rule-based", "v2-embedding"
  
    @Column({ type: 'json', nullable: true })
    embeddingMetadata: Record<string, any>;
    // futur : vecteurs, similarity score etc.
  
    // =====================================
    // AUDIT
    // =====================================
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }