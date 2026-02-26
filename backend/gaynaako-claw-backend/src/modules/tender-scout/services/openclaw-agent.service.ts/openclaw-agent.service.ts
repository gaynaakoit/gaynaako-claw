import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OpenClawAgentService {
  private readonly logger = new Logger(OpenClawAgentService.name);
  private readonly MAX_RETRIES = 3;

  constructor(private readonly http: HttpService) {}

  async scrapeAchatPublics(): Promise<any[]> {
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        this.logger.log(`[Attempt ${attempt}] Launching OpenClaw Agent...`);

        const mission = {
          instructions: `
            Navigate to https://www.achatspublics.sn/
            Extract all active tenders.
            Return structured JSON only.
            `,
          maxSteps: 20,
          structuredOutput: true,
        };

        const response$ = this.http.post(
          'http://localhost:8080/run',
          mission,
          {
            timeout: 120000, // 120 secondes
          },
        );

        const response = await lastValueFrom(response$);

        const tenders = response.data?.data || [];

        const validTenders = tenders.filter(
          (t) => t.title && t.organization,
        );

        this.logger.log(`OpenClaw returned ${validTenders.length} tenders`);

        return validTenders;
      } catch (error) {
        this.logger.error(`Attempt ${attempt} failed`);

        if (attempt === this.MAX_RETRIES) {
          throw new HttpException('OpenClaw failed', 500);
        }
      }
    }

    return [];
  }
}