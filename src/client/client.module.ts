import { Module } from '@nestjs/common';
import { MoralisService } from './moralis/moralis.service';
import { EtherscanService } from './etherscan/etherscan.service';
import { AlchemyService } from './alchemy/alchemy.service';
import { PinataService } from './pinata/pinata.service';

@Module({
  providers: [MoralisService, EtherscanService, AlchemyService, PinataService],
})
export class ClientModule {}
