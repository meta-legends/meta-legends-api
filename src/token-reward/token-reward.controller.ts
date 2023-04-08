import {Controller, Get, Header, Param} from '@nestjs/common';
import {TokenRewardService} from "./token-reward.service";

@Controller('token-reward')
export class TokenRewardController {
    constructor(private tokenRewardService: TokenRewardService) {}

    @Header('content-type', 'application/json')
    @Get(':walletAddress/estimate')
    estimate(@Param('walletAddress') walletAddress: string) {
        return this.tokenRewardService.estimate();
    }
}
