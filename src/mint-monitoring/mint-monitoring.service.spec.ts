import { Test, TestingModule } from '@nestjs/testing';
import { MintMonitoringService } from './mint-monitoring.service';

describe('MintMonitoringService', () => {
  let service: MintMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintMonitoringService],
    }).compile();

    service = module.get<MintMonitoringService>(MintMonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
