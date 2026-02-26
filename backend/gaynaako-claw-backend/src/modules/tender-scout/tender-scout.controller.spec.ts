import { Test, TestingModule } from '@nestjs/testing';
import { TenderScoutController } from './tender-scout.controller';

describe('TenderScoutController', () => {
  let controller: TenderScoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenderScoutController],
    }).compile();

    controller = module.get<TenderScoutController>(TenderScoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
