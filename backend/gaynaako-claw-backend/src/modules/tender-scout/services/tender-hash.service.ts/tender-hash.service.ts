import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TenderHashService {
  generate(tender: any): string {
    const normalize = (value: string) =>
      value?.toLowerCase().trim() || '';
  
    const base = [
      normalize(tender.title),
      normalize(tender.organization),
      tender.deadline?.toString() || '',
      normalize(tender.referenceNumber),
    ].join('|');
  
    return crypto.createHash('sha256').update(base).digest('hex');
  }
}
