import {
  Controller,
  Get,
  Header,
  UseInterceptors,
  Inject,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { AlchemyService } from '../client/alchemy/alchemy.service';

import { MintPackage } from '../mint-package/mint-package.entity';

import { BadgeService } from './badge/badge.service';
import { LegendService } from '../legend/legend.service';
import { MintPackageService } from '../mint-package/mint-package.service';
import { RewardService } from './reward.service';
import { TokenService } from './token/token.service';
import { UnstakedService } from './unstaked/unstaked.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';

@Controller('rewards')
export class RewardController {
  constructor(
    private rewardService: RewardService,
    private badgeService: BadgeService,
    private tokenService: TokenService,
    private mintPackageService: MintPackageService,
    private legendService: LegendService,
    private unstakedService: UnstakedService,
    private alchemyService: AlchemyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Header('content-type', 'application/json')
  @Get('')
  async estimate(@Req() request: Request) {
    const wallet = request['user-wallet'];
    const rewards = await this.cacheManager.get('reward-estimate-' + wallet);
    if (rewards != null) {
      return rewards;
    }
    const legends = await this.legendService.getNfts(wallet);
    const mintPackages: MintPackage[] | null =
      await this.mintPackageService.getByMintWallet(wallet);

    const value = {
      wallet: wallet,
      rewards: {
        badge: this.badgeService.getRewardBadge(legends.length),
        token: await this.tokenService.getRewardToken(mintPackages),
        unstaked: await this.unstakedService.findOneByWallet(wallet),
        legend: legends,
      },
    };
    await this.cacheManager.set('reward-estimate-' + wallet, value, 3600000);

    return value;
  }
}
