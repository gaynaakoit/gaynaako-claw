import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TenderHashService {
  generate(tender: any): string {
    const base = `${tender.title}-${tender.organization}-${tender.deadline}`;
    return crypto.createHash('sha256').update(base).digest('hex');
  }
}
