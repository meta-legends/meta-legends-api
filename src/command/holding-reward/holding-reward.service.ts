import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { HoldingRewardService as HoldingRewardManager } from '../../holding-reward/holding-reward.service';
import { writeFile } from 'fs';
import * as moment from 'moment';
interface BasicCommandOptions {
  string?: string;
}

@Command({
  name: 'holding-rewards-build-list',
  description: 'Build list to add on blockchain',
})
@Injectable()
export class HoldingRewardService extends CommandRunner {
  private static readonly logger = new Logger(HoldingRewardService.name);
  constructor(private holdingRewardManager: HoldingRewardManager) {
    super();
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    HoldingRewardService.logger.log('[Command] HoldingRewardService');
    const limit = 200;
    const rewardCode = passedParam[0];
    const lastUpsertAt = passedParam[1];
    const now = moment().format('YYYYMMDDHHmmss');
    const userQuandities = {};
    const wallets = [];
    const holdingRewards =
      await this.holdingRewardManager.getUsersMadeRecentEstimate(
        rewardCode,
        lastUpsertAt,
      );
    holdingRewards.forEach((holdingReward) => {
      if (holdingReward.user.wallet in userQuandities) {
        userQuandities[holdingReward.user.wallet]++;
      } else {
        userQuandities[holdingReward.user.wallet] = 1;
        wallets.push(holdingReward.user.wallet);
      }
    });

    const filepath = `./data/holding-reward/${now}_${rewardCode}.txt`;
    const listWallet = [];
    const listQuantity = [];

    const rows = [];

    let index = 0;
    wallets.forEach((wallet) => {
      if (index != 0 && index % limit == 0) {
        rows.push(listWallet.join(','));
        rows.push(listQuantity.join(','));
        listWallet.length = 0;
        listQuantity.length = 0;
      }
      listWallet.push(wallet);
      listQuantity.push(userQuandities[wallet]);
      index++;
    });

    writeFile(filepath, rows.join('\n'), (err) => {
      if (err) {
        console.log('Error Found:', err);
      } else {
        console.log('\nList ok');
      }
    });
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }
}
