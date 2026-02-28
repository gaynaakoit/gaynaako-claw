import { Body, Controller, Logger, Post } from '@nestjs/common';
import { TenderScoutService } from './tender-scout.service';
import { OpenClawAgentService } from './services/openclaw-agent.service.ts/openclaw-agent.service';

@Controller('tender-scout')
export class TenderScoutController {
  private readonly logger = new Logger(TenderScoutService.name);

  constructor(
    private readonly tenderScoutService: TenderScoutService,
    private readonly openClawAgent: OpenClawAgentService,
  ) {}

  @Post('scrape')
  async scrapeFromOpenClaw() {
    const tenders = await this.openClawAgent.scrapeAchatPublics();

    await this.tenderScoutService.processIncomingTenders(tenders);

    return {
      message: 'Scraping completed',
      count: tenders.length,
    };
  }

  // 🔹 Route pour recevoir les tenders envoyés par OpenClaw
  @Post('receive')
  async processIncomingData(tenders: any[]) {
    console.log('🔥 BODY RECEIVED:', JSON.stringify(tenders, null, 2));

    if (!tenders || !Array.isArray(tenders) || tenders.length === 0) {
      this.logger.warn('No tenders received from OpenClaw');
      return;
    }

    const validTenders = tenders.filter(t => t.title && t.organization);
    this.logger.log(`Processing ${validTenders.length} valid tenders from OpenClaw`);

    await this.tenderScoutService.processIncomingTenders(validTenders);
    this.logger.log('Tenders successfully saved');
  }
  
}

