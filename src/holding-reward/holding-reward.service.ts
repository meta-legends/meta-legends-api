import { BadRequestException, Injectable } from '@nestjs/common';
import { Legend } from '@src/legend/legend.entity';
import * as moment from 'moment';
import { User } from '@src/user/user.entity';
import { HOLDING_REWARDS_KEY_VALUE } from '@src/enum/holding-reward';
import { HoldingReward } from '@src/holding-reward/holding-reward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HoldingRewardService {
  constructor(
    @InjectRepository(HoldingReward)
    private holdingRewardRepository: Repository<HoldingReward>,
  ) {}

  isEligible(legend: Legend, duration: number): boolean {
    const now = moment();
    const purchasedOn = moment(legend.purchasedOn);

    return now.diff(purchasedOn, 'months') >= duration;
  }

  async buildNewHoldingRewards(
    user: User,
    legends: Legend[],
    holdingRewardCode: string,
  ): Promise<HoldingReward[] | null> {
    const hRewardSelected = HOLDING_REWARDS_KEY_VALUE[holdingRewardCode];
    const holdingRewards = [];
    legends.map((legend) => {
      if (!this.isEligible(legend, hRewardSelected.duration)) {
        return;
      }
      const holdingReward = new HoldingReward();
      holdingReward.rewardCode = holdingRewardCode;
      holdingReward.tokenId = legend.tokenId;
      holdingReward.user = user;
      holdingReward.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
      holdingRewards.push(holdingReward);
    });
    await this.holdingRewardRepository.save(holdingRewards);
    return holdingRewards;
  }
}
