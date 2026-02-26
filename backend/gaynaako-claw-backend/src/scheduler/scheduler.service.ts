import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenClawAgentService } from  '../modules/tender-scout/services/openclaw-agent.service.ts/openclaw-agent.service';
import { TenderScoutService } from '../modules/tender-scout/tender-scout.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly openClawAgent: OpenClawAgentService,
    private readonly tenderScoutService: TenderScoutService,
  ) {}

  @Cron('0 0 18 * * *') // Tous les jours à 18h
  async handleDailyScrape() {
    this.logger.log('Starting daily tender scrape (18h)...');

    try {
      const tenders = await this.openClawAgent.scrapeAchatPublics();

      await this.tenderScoutService.processIncomingTenders(tenders);

      this.logger.log(`Daily scrape completed: ${tenders.length} tenders processed`);
    } catch (error) {
      this.logger.error('Daily scrape failed', error);
    }
  }
}