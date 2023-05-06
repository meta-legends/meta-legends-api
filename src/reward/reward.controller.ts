import { Controller, Get, Header, Param } from '@nestjs/common';
import { RewardService } from './reward.service';
import { MoralisService } from '../client/moralis/moralis.service';
import { BadgeService } from './badge/badge.service';
import { TokenService } from './token/token.service';

@Controller('rewards')
export class RewardController {
  constructor(
    private rewardService: RewardService,
    private badgeService: BadgeService,
    private tokenService: TokenService,
    private moralisService: MoralisService,
  ) {}

  @Header('content-type', 'application/json')
  @Get(':walletAddress/estimate')
  async estimate(@Param('walletAddress') walletAddress: string) {
    const response = await this.moralisService.getWalletNFtsByMLCollection(
      walletAddress,
      false,
    );
    return {
      wallet: walletAddress.toLowerCase(),
      rewards: {
        badge: this.badgeService.getBadgeRewards(response.result.length),
        token: await this.tokenService.getRewardToken(walletAddress),
        // holding: {},
        // staked-asset: {},
        // unstaked-asset: {},
      },
    };
  }
}
