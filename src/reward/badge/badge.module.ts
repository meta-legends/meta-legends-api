import { Module } from '@nestjs/common';
import { BadgeRewardService } from './badge-reward.service';

@Module({
  providers: [BadgeRewardService],
  controllers: [],
})
export class BadgeModule {}
