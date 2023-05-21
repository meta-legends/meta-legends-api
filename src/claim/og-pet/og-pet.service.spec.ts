import { Test, TestingModule } from '@nestjs/testing';
import { OgPetService } from './og-pet.service';

describe('OgPetService', () => {
  let service: OgPetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OgPetService],
    }).compile();

    service = module.get<OgPetService>(OgPetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
