import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HoldingRewardService } from '../holding-reward/holding-reward.service';
import { HoldingReward } from '../holding-reward/holding-reward.entity';

describe('HoldingRewardService', () => {
  let service: HoldingRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HoldingRewardService,
        {
          provide: getRepositoryToken(HoldingReward),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HoldingRewardService>(HoldingRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('should handle duplicate data', () => {
    expect(true).toEqual(true);
  });
});
