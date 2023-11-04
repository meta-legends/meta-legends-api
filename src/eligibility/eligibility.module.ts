import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { OgPetService } from './og-pet/og-pet.service';
import { OgPet } from './og-pet/og-pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EligibilityService } from './eligibility.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Module({
  imports: [TypeOrmModule.forFeature([OgPet])],
  exports: [TypeOrmModule],
  controllers: [EligibilityController],
  providers: [OgPetService, EligibilityService, AlchemyService],
})
export class EligibilityModule {}
