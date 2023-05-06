import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { MoralisService } from '../client/moralis/moralis.service';
import { BadgeService } from './badge/badge.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, MoralisService, BadgeService],
})
export class RewardModule {}
