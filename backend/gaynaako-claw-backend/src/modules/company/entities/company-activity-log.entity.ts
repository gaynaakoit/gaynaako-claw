import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('company_activity_logs')
export class CompanyActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @Column('jsonb')
  changes: any; // On stocke le DTO de modification ou un diff

  @Column()
  updatedBy: string; // ID de l'utilisateur qui a fait la modification

  @CreateDateColumn()
  createdAt: Date;
}