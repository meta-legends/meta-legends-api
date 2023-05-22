import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceOgPetService } from './preference-og-pet.service';

describe('PreferenceOgPetService', () => {
  let service: PreferenceOgPetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferenceOgPetService],
    }).compile();

    service = module.get<PreferenceOgPetService>(PreferenceOgPetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
