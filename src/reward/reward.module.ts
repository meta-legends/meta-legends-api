import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RewardController } from './reward.controller';

import { MintPackage } from '../mint-package/mint-package.entity';

import { BadgeService } from './badge/badge.service';
import { MintPackageService } from '../mint-package/mint-package.service';
import { MoralisService } from '../client/moralis/moralis.service';
import { TokenService } from './token/token.service';
import { RewardService } from './reward.service';

@Module({
  imports: [TypeOrmModule.forFeature([MintPackage])],
  exports: [TypeOrmModule],
  controllers: [RewardController],
  providers: [
    RewardService,
    MoralisService,
    BadgeService,
    TokenService,
    MintPackageService,
  ],
})
export class RewardModule {}
