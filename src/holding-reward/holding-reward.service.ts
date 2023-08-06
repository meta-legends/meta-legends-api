import { Injectable } from '@nestjs/common';
import { Legend } from '@src/legend/legend.entity';
import * as moment from 'moment';
import { User } from '@src/user/user.entity';

@Injectable()
export class HoldingRewardService {
  isEligible(legend: Legend, duration: number): boolean {
    const now = moment();
    const purchasedOn = moment(legend.purchasedOn);

    return now.diff(purchasedOn, 'months') >= duration;
  }

  wishesToClaim(user: User): void {
    user.wallet
  }
}
