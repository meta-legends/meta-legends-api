import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TokenRewardService } from './token-reward.service';
import { MintPackage } from '../mint-package/mint-package.entity';
import { MintPackageService } from '../mint-package/mint-package.service';
import { Decimal } from 'decimal.js';

@Controller('token-rewards')
export class TokenRewardController {
  constructor(
    private tokenRewardService: TokenRewardService,
    private mintPackageService: MintPackageService,
  ) {}

  @Header('content-type', 'application/json')
  @Get(':walletAddress/estimate')
  async estimate(@Param('walletAddress') walletAddress: string) {
    const mintPackages: MintPackage[] | null =
      await this.mintPackageService.getByMintWallet(walletAddress);
    if (0 === mintPackages.length) {
      return new HttpException(
        'Wallet ' + walletAddress + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    let nbTokens = 0;
    let pricePaid = new Decimal(0);
    let rewards = new Decimal(0);

    mintPackages.forEach((mintPackage) => {
      nbTokens += mintPackage.nbTokens;
      pricePaid = pricePaid.plus(new Decimal(mintPackage.pricePaidEth));
      let reward = this.tokenRewardService.estimate(mintPackage, new Date());
      rewards = rewards.plus(new Decimal(reward));
    });

    const perkPackages = this.tokenRewardService.getPerkPackages(
      mintPackages,
      new Date(),
    );

    return {
      wallet: walletAddress.toLowerCase(),
      total_paid: Number(pricePaid),
      total_nft: nbTokens,
      total_token_rewards: Number(rewards),
      perk_packages: perkPackages,
      mint_packages: mintPackages,
    };
  }
}
