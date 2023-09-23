import { Module } from '@nestjs/common';
import { PerkArmorController } from './perk-armor/perk-armor.controller';
import { PerkArmorService } from './perk-armor/perk-armor.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { PerkOgPetController } from './perk-og-pet/perk-og-pet.controller';
import { PerkOgPetService } from './perk-og-pet/perk-og-pet.service';
import { CouncilStoneService } from './council-stone/council-stone.service';
import { CouncilStoneController } from './council-stone/council-stone.controller';
import { HonoraryController } from './honorary/honorary.controller';
import { HonoraryService } from './honorary/honorary.service';
import { WeaponSkinService } from './weapon-skin/weapon-skin.service';
import { WeaponSkinController } from './weapon-skin/weapon-skin.controller';

@Module({
  controllers: [
    PerkArmorController,
    PerkOgPetController,
    CouncilStoneController,
    HonoraryController,
    WeaponSkinController,
  ],
  providers: [
    PerkArmorService,
    AlchemyService,
    PerkOgPetService,
    CouncilStoneService,
    HonoraryService,
    WeaponSkinService,
  ],
})
export class CollectionsModule {}
