import { Module } from '@nestjs/common';
import { HoldingRewardController } from './holding-reward.controller';
import { HoldingRewardService } from './holding-reward.service';
import { LegendService } from '@src/legend/legend.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HoldingReward } from '@src/holding-reward/holding-reward.entity';
import { Legend } from '@src/legend/legend.entity';
import { EtherscanService } from '@src/client/etherscan/etherscan.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Module({
  imports: [TypeOrmModule.forFeature([HoldingReward, Legend])],
  exports: [TypeOrmModule],
  controllers: [HoldingRewardController],
  providers: [
    HoldingRewardService,
    LegendService,
    EtherscanService,
    AlchemyService,
  ],
})
export class HoldingRewardModule {}
