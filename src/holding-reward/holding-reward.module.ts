import { Module } from '@nestjs/common';
import { HoldingRewardController } from './holding-reward.controller';
import { HoldingRewardService } from './holding-reward.service';

@Module({
  controllers: [HoldingRewardController],
  providers: [HoldingRewardService]
})
export class HoldingRewardModule {}
