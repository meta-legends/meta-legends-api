import { Module } from '@nestjs/common';
import { HoldingRewardController } from './holding-reward.controller';
import { HoldingRewardService } from './holding-reward.service';
import { LegendService } from '../legend/legend.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HoldingReward } from '@src/holding-reward/holding-reward.entity';
import { Legend } from '../legend/legend.entity';
import { EtherscanService } from '@src/client/etherscan/etherscan.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HoldingReward, Legend, User])],
  exports: [TypeOrmModule],
  controllers: [HoldingRewardController],
  providers: [
    HoldingRewardService,
    LegendService,
    EtherscanService,
    AlchemyService,
    UserService,
  ],
})
export class HoldingRewardModule {}
