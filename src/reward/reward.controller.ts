import { Controller, Get, Header } from "@nestjs/common";

@Controller('reward')
export class RewardController {
  @Header('content-type', 'application/json')
  @Get(':walletAddress/badge')

}
