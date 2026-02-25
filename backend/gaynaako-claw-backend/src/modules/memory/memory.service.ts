import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class MemoryService {
  // Map interne pour stocker les profils
  constructor(private readonly redisService: RedisService) {}

  /**
   * Sauvegarde un profil d'entreprise dans la mémoire
   * @param company Company enrichie avec scores
   */
  async saveCompanyProfile(company: Company) {
    await this.redisService.set(`company:${company.id}`, company);
    console.log(`[MemoryService] Profile saved: ${company.id}`);
  }

  /**
   * Récupère un profil d'entreprise par ID
   * @param id string ID de la company
   * @returns Company | undefined
   */
  async getCompanyProfile(id: string): Promise<Company | undefined> {
    return this.redisService.get(`company:${id}`);
  }

  /**
   * Récupère tous les profils en mémoire (Redis)
   */
  async getAllProfiles(): Promise<Company[]> {
    const keys = await this.redisService.keys('company:*'); // utilise la méthode exposée
    const profiles: Company[] = [];

    for (const key of keys) {
      const profile = await this.redisService.get(key);
      if (profile) profiles.push(profile);
    }

    return profiles;
  }

  /**
   * Supprime un profil de la mémoire
   */
  async removeCompanyProfile(id: string) {
    await this.redisService.set(`company:${id}`, null);
    console.log(`[MemoryService] Profile removed: ${id}`);
  }
}


