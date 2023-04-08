import { Module } from '@nestjs/common';
import {TokenRewardService} from "./token-reward.service";
import {TokenRewardController} from "./token-reward.controller";

@Module({
    imports: [],
    exports: [],
    providers: [TokenRewardService],
    controllers: [TokenRewardController],
})
export class TokenRewardModule {}
