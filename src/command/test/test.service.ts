import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LegendService } from '../../legend/legend.service';
import { HoldingRewardService } from '@src/holding-reward/holding-reward.service';
import { UserService } from '../../user/user.service';
import { HOLDING_REWARDS_KEY_VALUE, HREWARD_1_CODE } from "@src/enum/holding-reward";

@Command({
  name: 'test',
  description: 'Sandbox',
})
@Injectable()
export class TestService extends CommandRunner {
  private static readonly logger = new Logger(TestService.name);
  constructor(
    private legendService: LegendService,
    private holdingRewardService: HoldingRewardService,
    private userService: UserService,
  ) {
    super();
  }

  async run() {
    TestService.logger.log('[Command] TestService');
    const wallet = '0x6a166a77aecbcb188dfe23440bbfc85ee806f031';
    const legends = await this.legendService.getNftsFromBdd(wallet);
    const user = await this.userService.findOne(wallet);
    const holdingRewards = this.holdingRewardService.buildNewHoldingRewards(
      user,
      legends,
      HREWARD_1_CODE,
    );
    console.log(holdingRewards);
  }
}
