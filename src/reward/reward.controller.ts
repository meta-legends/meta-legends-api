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
import { RewardService } from './reward.service';
import { AlchemyService } from '../client/alchemy/alchemy.service';
import { BadgeService } from './badge/badge.service';
import { TokenService } from './token/token.service';
import { UnstakedService } from './unstaked/unstaked.service';
import { MintPackage } from '../mint-package/mint-package.entity';
import { MintPackageService } from '../mint-package/mint-package.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('rewards')
export class RewardController {
  constructor(
    private rewardService: RewardService,
    private badgeService: BadgeService,
    private tokenService: TokenService,
    private mintPackageService: MintPackageService,
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
        // legend: {},
      },
    };
    await this.cacheManager.set('reward-estimate-' + wallet, value, 3600000);

    return value;
  }
}
