import { Module } from '@nestjs/common';
import { PerkArmorController } from './perk-armor/perk-armor.controller';
import { PerkArmorService } from './perk-armor/perk-armor.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { PerkOgPetController } from './perk-og-pet/perk-og-pet.controller';
import { PerkOgPetService } from './perk-og-pet/perk-og-pet.service';
import { CouncilStoneService } from './council-stone/council-stone.service';
import { CouncilStoneController } from './council-stone/council-stone.controller';

@Module({
  // imports: [AlchemyService],
  controllers: [PerkArmorController, PerkOgPetController, CouncilStoneController],
  providers: [PerkArmorService, AlchemyService, PerkOgPetService, CouncilStoneService],
})
export class CollectionsModule {}
