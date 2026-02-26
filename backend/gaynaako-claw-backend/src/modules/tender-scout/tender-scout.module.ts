import { Module } from '@nestjs/common';
import { TenderScoutService } from './tender-scout.service';
import { TenderScoutController } from './tender-scout.controller';

@Module({
  providers: [TenderScoutService],
  controllers: [TenderScoutController]
})
export class TenderScoutModule {}
