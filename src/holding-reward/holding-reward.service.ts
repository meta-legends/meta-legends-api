import { BadRequestException, Injectable } from '@nestjs/common';
import { Legend } from '@src/legend/legend.entity';
import * as moment from 'moment';
import { User } from '@src/user/user.entity';
import { LegendService } from '@src/legend/legend.service';
import { HOLDING_REWARDS_KEY_VALUE } from '@src/enum/holding-reward';
import { HoldingReward } from '@src/holding-reward/holding-reward.entity';

@Injectable()
export class HoldingRewardService {
  constructor(private legendService: LegendService) {}

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
    if (HOLDING_REWARDS_KEY_VALUE[holdingRewardCode] == undefined) {
      throw new BadRequestException(
        `Unknow holding reward code \'${holdingRewardCode}\'`,
      );
    }
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

    return holdingRewards;
  }
}
