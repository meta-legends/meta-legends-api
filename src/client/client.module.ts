import { Module } from '@nestjs/common';
import { MoralisService } from './moralis/moralis.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { AlchemyService } from './alchemy/alchemy.service';

@Module({
  providers: [MoralisService, EtherscanService, AlchemyService],
})
export class ClientModule {}
