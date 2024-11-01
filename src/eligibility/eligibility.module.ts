import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { OgPetService } from './og-pet/og-pet.service';
import { OgPet } from './og-pet/og-pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EligibilityService } from './eligibility.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { OgLandService } from './og-land/og-land.service';
import { LandWishService } from './land-wish/land-wish.service';
import { LandWishController } from './land-wish/land-wish.controller';
import { UserService } from '@src/user/user.service';
import { OgLand } from './og-land/og-land.entity';
import { LandWish } from '@src/eligibility/land-wish/land-wish.entity';
import { User } from '@src/user/user.entity';
import { OgLandController } from '@src/eligibility/og-land/og-land.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OgPet, OgLand, LandWish, User])],
  exports: [TypeOrmModule],
  controllers: [EligibilityController, LandWishController, OgLandController],
  providers: [
    OgPetService,
    EligibilityService,
    AlchemyService,
    OgLandService,
    LandWishService,
    UserService,
    OgLandService,
  ],
})
export class EligibilityModule {}
