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
  async processIncomingData(@Body() body: any) {
    // 🔹 Affiche tout ce qui est reçu
    this.logger.log('🔥 BODY RECEIVED:');
    if (body === undefined) {
      this.logger.log('undefined');
    } else if (body === null) {
      this.logger.log('null');
    } else if (typeof body === 'string') {
      this.logger.log(`(string) ${body}`);
    } else if (typeof body === 'object') {
      try {
        this.logger.log(JSON.stringify(body, null, 2));
      } catch (err) {
        this.logger.log('(object, cannot stringify)');
        this.logger.log(body);
      }
    } else {
      this.logger.log(`(${typeof body}) ${body}`);
    }
  
    // 🔹 Si ce n’est pas un tableau, on peut juste avertir
    const tenders = Array.isArray(body) ? body : [];
    if (tenders.length === 0) {
      this.logger.warn('No tenders received from OpenClaw');
      return;
    }
  
    const validTenders = tenders.filter(t => t.title && t.organization);
    this.logger.log(`Processing ${validTenders.length} valid tenders from OpenClaw`);
  
    await this.tenderScoutService.processIncomingTenders(validTenders);
    this.logger.log('Tenders successfully saved');
  }
  
}

