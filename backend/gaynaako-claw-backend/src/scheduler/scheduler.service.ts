import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OpenClawAgentService } from  '../modules/tender-scout/services/openclaw-agent.service.ts/openclaw-agent.service';
import { TenderScoutService } from '../modules/tender-scout/tender-scout.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private isRunning = false;
  private cronEnabled = false; // mettre à false pour ne pas exécuter


  constructor(
    private readonly openClawAgent: OpenClawAgentService,
    private readonly tenderScoutService: TenderScoutService,
  ) {}

  @Cron('*/1 * * * *')
  async handleDailyScrape() {
    if (!this.cronEnabled) {return}
    if (this.isRunning) {
      this.logger.warn('Scrape already running — skipping...');
      return;
    }

    this.isRunning = true;
    this.logger.log('Starting tender scrape...');

    try {
      const tenders = await this.openClawAgent.scrapeAchatPublics();
      await this.tenderScoutService.processIncomingTenders(tenders);

      this.logger.log(
        `Scrape completed: ${tenders.length} tenders processed`,
      );
    } catch (error) {
      this.logger.error('Scrape failed', error);
    } finally {
      this.isRunning = false;
    }
  }
}