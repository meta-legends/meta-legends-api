import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceOgPetController } from './preference-og-pet.controller';

describe('PreferenceOgPetController', () => {
  let controller: PreferenceOgPetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenceOgPetController],
    }).compile();

    controller = module.get<PreferenceOgPetController>(PreferenceOgPetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
