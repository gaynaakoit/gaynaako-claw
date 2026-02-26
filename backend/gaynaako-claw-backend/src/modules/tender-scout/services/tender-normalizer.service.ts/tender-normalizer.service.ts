import { Injectable } from '@nestjs/common';
import { Tender } from '../../entities/tender.entity';

@Injectable()
export class TenderNormalizerService {
  normalize(raw: any): Partial<Tender> {
    return {
      title: raw.title?.trim(),
      organization: raw.organization?.trim(),
      deadline: raw.deadline ? new Date(raw.deadline) : null,
      publicationDate: raw.publicationDate
        ? new Date(raw.publicationDate)
        : null,
      referenceNumber: raw.referenceNumber || null,
      pdfUrl: raw.pdfUrl || null,
      sourceUrl: raw.sourceUrl,
      source: raw.source,
    };
  }
}