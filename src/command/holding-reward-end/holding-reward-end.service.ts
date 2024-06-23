import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { HoldingRewardService } from '@src/holding-reward/holding-reward.service';
import { LegendService } from '@src/legend/legend.service';
import {User} from "@src/user/user.entity";
import {UserService} from "@src/user/user.service";

/*
GMT: Sunday 30 June 2024 21:59:59

npm run command-nest end-rewards-build-list
*/
@Command({
  name: 'end-rewards-build-list',
  description: 'Build list to add on blockchain',
})
@Injectable()
export class HoldingRewardEndService extends CommandRunner {
  private static readonly logger = new Logger(HoldingRewardEndService.name);
  constructor(
    private holdingRewardService: HoldingRewardService,
    private legendService: LegendService,
    private userService: UserService,
  ) {
    super();
  }
  // run(passedParams: string[], options?: Record<string, any>): Promise<void> {
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    HoldingRewardEndService.logger.log('[Command] HoldingRewardEndService');
    const holdingRewards = await this.holdingRewardService.getAll();
    const wallets = [];
    const users = [];
    holdingRewards.forEach((holdingReward) => {
      if (wallets.includes(holdingReward.user.wallet) === false) {
        wallets.push(holdingReward.user.wallet);
        users.push(holdingReward.user);
      }
    });
    let index = 0;
    for (const user of users) {
      await this.legendService.getNfts(user.wallet);
      const legends = await this.legendService.getNftsFromBdd(user.wallet);
      this.holdingRewardService.process(user, legends, true);
      console.log(user.wallet);
      console.log(index++);
    }
  }
}
