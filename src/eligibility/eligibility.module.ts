import { Module } from '@nestjs/common';
import { EligibilityController } from './eligibility.controller';
import { OgPetService } from './og-pet/og-pet.service';
import { OgPet } from './og-pet/og-pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EligibilityService } from './eligibility.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/user.entity';
import { AuthModule } from '@src/auth/auth.module';
import { LandModule } from '@src/land/land.module';

@Module({
  imports: [TypeOrmModule.forFeature([OgPet, User]), AuthModule, LandModule],
  exports: [TypeOrmModule],
  controllers: [EligibilityController],
  providers: [OgPetService, EligibilityService, AlchemyService, UserService],
})
export class EligibilityModule {}
