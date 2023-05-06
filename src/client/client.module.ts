import { Module } from '@nestjs/common';
import { MoralisService } from './moralis/moralis.service';

@Module({
  providers: [MoralisService],
})
export class ClientModule {}
