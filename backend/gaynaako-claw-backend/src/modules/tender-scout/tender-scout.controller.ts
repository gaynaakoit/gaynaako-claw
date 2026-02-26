import { Controller, Post } from '@nestjs/common';
import { TenderScoutService } from './tender-scout.service';
import { OpenClawAgentService } from './services/openclaw-agent.service.ts/openclaw-agent.service';

@Controller('tender-scout')
export class TenderScoutController {
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
}

