import { Test, TestingModule } from '@nestjs/testing';
import { TenderScoutService } from './tender-scout.service';

describe('TenderScoutService', () => {
  let service: TenderScoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenderScoutService],
    }).compile();

    service = module.get<TenderScoutService>(TenderScoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
