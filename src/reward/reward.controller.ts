import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { AlchemyService } from '../client/alchemy/alchemy.service';

import { MintPackage } from '../mint-package/mint-package.entity';

import { BadgeService } from './badge/badge.service';
import { LegendService } from './legend/legend.service';
import { MintPackageService } from '../mint-package/mint-package.service';
import { RewardService } from './reward.service';
import { TokenService } from './token/token.service';
import { UnstakedService } from './unstaked/unstaked.service';

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

  @UseInterceptors(CacheInterceptor)
  @Header('content-type', 'application/json')
  @Get(':walletAddress/estimate')
  async estimate(@Param('walletAddress') walletAddress: string) {
    const wallet = walletAddress.toLowerCase();
    const rewards = await this.cacheManager.get('reward-estimate-' + wallet);
    if (rewards != null) {
      return rewards;
    }

    const response = await this.alchemyService.getNFTsByWallet(wallet);
    await this.cacheManager.set(
      'client-alchemy-getNFTsByWallet-' + wallet,
      response,
      3600000,
    );

    const mintPackages: MintPackage[] | null =
      await this.mintPackageService.getByMintWallet(wallet);
    if (0 === mintPackages.length) {
      return new HttpException(
        'Wallet ' + wallet + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const value = {
      wallet: wallet,
      rewards: {
        badge: this.badgeService.getRewardBadge(response.totalCount),
        token: await this.tokenService.getRewardToken(mintPackages),
        unstaked: await this.unstakedService.findOneByWallet(wallet),
        legend: await this.legendService.getRewardHolding(wallet),
      },
    };
    await this.cacheManager.set('reward-estimate-' + wallet, value, 3600000);

    return value;
  }
}
