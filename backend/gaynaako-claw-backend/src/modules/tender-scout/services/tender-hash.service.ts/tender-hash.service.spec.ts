import { Test, TestingModule } from '@nestjs/testing';
import { TenderHashService } from './tender-hash.service';

describe('TenderHashServiceTsService', () => {
  let service: TenderHashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenderHashService],
    }).compile();

    service = module.get<TenderHashService>(TenderHashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
