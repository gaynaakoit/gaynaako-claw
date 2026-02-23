import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  @Cron('*/2 * * * *')
  handleCron() {
    console.log('Autonomous system heartbeat...');
  }
}
