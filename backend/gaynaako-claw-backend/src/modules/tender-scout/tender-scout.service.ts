import { Injectable } from '@nestjs/common';
import { TenderHashService } from './services/tender-hash.service.ts/tender-hash.service';
import { TenderNormalizerService } from './services/tender-normalizer.service.ts/tender-normalizer.service';
import { Repository } from 'typeorm';
import { Tender } from './entities/tender.entity';

@Injectable()
export class TenderScoutService {
    constructor(private readonly tenderRepository: Repository<Tender>,
        private readonly hashService: TenderHashService, private normalizer: TenderNormalizerService) {}

    async processIncomingTenders(rawTenders: any[]) {
        for (const raw of rawTenders) {
          const normalized = this.normalizer.normalize(raw);
          const hash = this.hashService.generate(normalized);
      
          normalized.hash = hash;
          normalized.isFromOpenClaw = true;
      
          await this.tenderRepository.save(normalized);
        }
      }
}
