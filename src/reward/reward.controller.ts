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
import { MoralisService } from '../client/moralis/moralis.service';
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
    private moralisService: MoralisService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('get-all-data')
  async getData() {
    //Get all keys
    const keys = await this.cacheManager.store.keys();

    //Loop through keys and get data
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    return allData;
  }

  @UseInterceptors(CacheInterceptor)
  @Header('content-type', 'application/json')
  @Get(':walletAddress/estimate')
  async estimate(@Param('walletAddress') walletAddress: string) {
    const wallet = walletAddress.toLowerCase();
    const rewards = await this.cacheManager.get(
      'reward-estimate-' + wallet,
    );
    if (rewards != null) {
      return rewards;
    }

    const response = await this.moralisService.getWalletNFtsByMLCollection(
      wallet,
      false,
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
        badge: this.badgeService.getRewardBadge(response.result.length),
        token: await this.tokenService.getRewardToken(mintPackages),
        unstaked: await this.unstakedService.findOneByWallet(wallet),
        // holding: {},
      },
    };
    await this.cacheManager.set(
      'reward-estimate-' + walletAddress,
      value,
      3600000,
    );

    return value;
  }
}
