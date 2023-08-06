import {
  Controller,
  Post,
  Header,
  Req,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
import { LegendService } from '@src/legend/legend.service';
import { UserService } from '@src/user/user.service';
import { HOLDING_REWARDS_KEY_VALUE } from '@src/enum/holding-reward';
import { HoldingRewardService } from '@src/holding-reward/holding-reward.service';

@Controller('holding-rewards')
export class HoldingRewardController {
  constructor(
    private legendService: LegendService,
    private userService: UserService,
    private holdingRewardService: HoldingRewardService,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Post('/:holdingRewardCode/estimate')
  async estimate(
    @Param('holdingRewardCode') holdingRewardCode: string,
    @Req() request: Request,
  ) {
    if (HOLDING_REWARDS_KEY_VALUE[holdingRewardCode] == undefined) {
      throw new BadRequestException(
        `Unknow holding reward code \'${holdingRewardCode}\'`,
      );
    }
    const legends = await this.legendService.getNftsFromBdd(
      request['user-wallet'],
    );
    const user = await this.userService.findOne(request['user-wallet']);
    return await this.holdingRewardService.buildNewHoldingRewards(
      user,
      legends,
      holdingRewardCode,
    );
  }
}
