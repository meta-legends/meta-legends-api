import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RewardController } from './reward.controller';

import { MintPackage } from '../mint-package/mint-package.entity';
import { Unstaked } from './unstaked/unstaked.entity';
import { Legend } from './legend/legend.entity';

import { BadgeService } from './badge/badge.service';
import { MintPackageService } from '../mint-package/mint-package.service';
import { EtherscanService } from '../client/etherscan/etherscan.service';
import { TokenService } from './token/token.service';
import { RewardService } from './reward.service';
import { UnstakedService } from './unstaked/unstaked.service';
import { Unstaked } from './unstaked/unstaked.entity';
import { HoldingService } from './holding/holding.service';

@Module({
  imports: [TypeOrmModule.forFeature([MintPackage, Unstaked, Legend])],
  exports: [TypeOrmModule],
  controllers: [RewardController],
  providers: [
    RewardService,
    EtherscanService,
    BadgeService,
    TokenService,
    MintPackageService,
    UnstakedService,
    HoldingService,
  ],
})
export class RewardModule {}
