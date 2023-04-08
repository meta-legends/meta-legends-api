import {Controller, Get, Header, HttpException, HttpStatus, Param} from '@nestjs/common';
import {TokenRewardService} from "./token-reward.service";
import {MintPackage} from "../mint-package/mint-package.entity";
import {MintPackageService} from "../mint-package/mint-package.service";
import {Decimal} from 'decimal.js';

@Controller('token-reward')
export class TokenRewardController {
    constructor(
        private tokenRewardService: TokenRewardService,
        private mintPackageService: MintPackageService
    ) {}

    @Header('content-type', 'application/json')
    @Get(':walletAddress/estimate')
    async estimate(@Param('walletAddress') walletAddress: string) {
        const mintPackages: MintPackage[] | null = await this.mintPackageService.getByFromMintWallet(walletAddress);
        if (0 === mintPackages.length) {
            return new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
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

        return {
            wallet: walletAddress,
            price_paid: Number(pricePaid),
            number_of_token: nbTokens,
            rewards: Number(rewards),
            mint_packages: mintPackages
        };
    }
}
