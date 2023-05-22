import { Module } from '@nestjs/common';

import { PreferenceOgPetService } from './preference-og-pet/preference-og-pet.service';
import { PreferenceOgPetController } from './preference-og-pet/preference-og-pet.controller';

@Module({
  controllers: [PreferenceOgPetController],
  providers: [PreferenceOgPetService],
})
export class ClaimModule {}
