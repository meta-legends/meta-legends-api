import { Module } from '@nestjs/common';
import { MoralisService } from './moralis/moralis.service';
import { EtherscanService } from './etherscan/etherscan.service';

@Module({
  providers: [MoralisService, EtherscanService],
})
export class ClientModule {}
