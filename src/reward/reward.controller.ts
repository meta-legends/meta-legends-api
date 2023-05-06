import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { MoralisService } from '../client/moralis/moralis.service';
import { BadgeService } from './badge/badge.service';
import { TokenService } from './token/token.service';
import { MintPackage } from '../mint-package/mint-package.entity';
import { MintPackageService } from '../mint-package/mint-package.service';

@Controller('rewards')
export class RewardController {
  constructor(
    private rewardService: RewardService,
    private badgeService: BadgeService,
    private tokenService: TokenService,
    private mintPackageService: MintPackageService,
    private moralisService: MoralisService,
  ) {}

  @Header('content-type', 'application/json')
  @Get(':walletAddress/estimate')
  async estimate(@Param('walletAddress') walletAddress: string) {
    const response = await this.moralisService.getWalletNFtsByMLCollection(
      walletAddress,
      false,
    );

    const mintPackages: MintPackage[] | null =
      await this.mintPackageService.getByMintWallet(walletAddress);
    if (0 === mintPackages.length) {
      return new HttpException(
        'Wallet ' + walletAddress + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      wallet: walletAddress.toLowerCase(),
      rewards: {
        badge: this.badgeService.getRewardBadge(response.result.length),
        token: await this.tokenService.getRewardToken(mintPackages),
        // holding: {},
        // staked-asset: {},
        // unstaked-asset: {},
      },
    };
  }
}
