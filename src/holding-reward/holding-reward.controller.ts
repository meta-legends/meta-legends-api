import { Controller, Get, Post, Header, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
import { LegendService } from '../legend/legend.service';
import { UserService } from '../user/user.service';
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
  @Post('/estimate')
  async estimate(@Req() request: Request) {
    const legends = await this.legendService.getNftsFromBdd(
      request['user-wallet'],
    );
    const user = await this.userService.findOne(request['user-wallet']);
    return await this.holdingRewardService.process(user, legends);
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request) {
    const user = await this.userService.findOne(request['user-wallet']);
    return await this.holdingRewardService.findByUser(user);
  }
}
