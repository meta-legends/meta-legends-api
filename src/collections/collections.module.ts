import { Module } from '@nestjs/common';
import { PerkArmorController } from './perk-armor/perk-armor.controller';
import { PerkArmorService } from './perk-armor/perk-armor.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { PerkOgPetController } from './perk-og-pet/perk-og-pet.controller';
import { PerkOgPetService } from './perk-og-pet/perk-og-pet.service';

@Module({
  // imports: [AlchemyService],
  controllers: [PerkArmorController, PerkOgPetController],
  providers: [PerkArmorService, AlchemyService, PerkOgPetService],
})
export class CollectionsModule {}
