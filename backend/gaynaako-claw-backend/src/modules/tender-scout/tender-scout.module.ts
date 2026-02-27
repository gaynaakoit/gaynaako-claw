import { Module } from '@nestjs/common';
import { TenderScoutService } from './tender-scout.service';
import { TenderScoutController } from './tender-scout.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenClawAgentService } from './services/openclaw-agent.service.ts/openclaw-agent.service';
import { TenderNormalizerService } from './services/tender-normalizer.service.ts/tender-normalizer.service';
import { TenderHashService } from './services/tender-hash.service.ts/tender-hash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tender } from './entities/tender.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { TenderMatch } from './entities/tender-match.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Tender, TenderMatch]), ScheduleModule.forRoot()],
  providers: [TenderScoutService, OpenClawAgentService, TenderNormalizerService, TenderHashService, SchedulerService],
  controllers: [TenderScoutController]
})
export class TenderScoutModule {}
