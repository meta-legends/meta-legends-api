import { Test, TestingModule } from '@nestjs/testing';
import { PerkArmorService } from './perk-armor.service';

describe('PerkArmorService', () => {
  let service: PerkArmorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerkArmorService],
    }).compile();

    service = module.get<PerkArmorService>(PerkArmorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
