import { Module } from '@nestjs/common';
import { EtherscanService } from './etherscan/etherscan.service';
import { AlchemyService } from './alchemy/alchemy.service';
import { AlchemyV3Service } from './alchemy-v3/alchemy-v3.service';

@Module({
  providers: [EtherscanService, AlchemyService, AlchemyV3Service],
})
export class ClientModule {}
