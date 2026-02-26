import { Test, TestingModule } from '@nestjs/testing';
import { OpenClawAgentService } from './openclaw-agent.service';

describe('OpenclawAgentService', () => {
  let service: OpenClawAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenClawAgentService],
    }).compile();

    service = module.get<OpenClawAgentService>(OpenClawAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
