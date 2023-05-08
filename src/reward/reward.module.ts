import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RewardController } from './reward.controller';

import { MintPackage } from '../mint-package/mint-package.entity';
import { Unstaked } from './unstaked/unstaked.entity';
import { Legend } from './legend/legend.entity';

import { BadgeService } from './badge/badge.service';
import { MintPackageService } from '../mint-package/mint-package.service';
import { TokenService } from './token/token.service';
import { RewardService } from './reward.service';
import { UnstakedService } from './unstaked/unstaked.service';
import { LegendService } from './legend/legend.service';

import { EtherscanService } from '../client/etherscan/etherscan.service';
import { AlchemyService } from '../client/alchemy/alchemy.service';
import { DatetimeService } from '../utils/datetime/datetime.service';

@Module({
  imports: [TypeOrmModule.forFeature([MintPackage, Unstaked, Legend])],
  exports: [TypeOrmModule],
  controllers: [RewardController],
  providers: [
    RewardService,
    EtherscanService,
    AlchemyService,
    BadgeService,
    TokenService,
    MintPackageService,
    UnstakedService,
    LegendService,
    DatetimeService,
  ],
})
export class RewardModule {}
