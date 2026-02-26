import { Test, TestingModule } from '@nestjs/testing';
import { TenderNormalizerService } from './tender-normalizer.service';

describe('TenderNormalizerService', () => {
  let service: TenderNormalizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenderNormalizerService],
    }).compile();

    service = module.get<TenderNormalizerService>(TenderNormalizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
