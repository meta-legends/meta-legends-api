import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan/etherscan.service';
import { AlchemyService } from './alchemy/alchemy.service';

@Module({
  providers: [EtherscanService, AlchemyService],
})
export class ClientModule {}
