import { Module } from '@nestjs/common';
import { BadgeRewardService } from './badge-reward.service';
import { BadgeRewardController } from './badge-reward.controller';

@Module({
  providers: [BadgeRewardService],
  controllers: [BadgeRewardController]
})
export class BadgeRewardModule {}
