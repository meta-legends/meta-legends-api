import { Module } from '@nestjs/common';
import { PerkArmorController } from './perk-armor/perk-armor.controller';
import { PerkArmorService } from './perk-armor/perk-armor.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Module({
  // imports: [AlchemyService],
  controllers: [PerkArmorController],
  providers: [PerkArmorService, AlchemyService],
})
export class CollectionsModule {}
