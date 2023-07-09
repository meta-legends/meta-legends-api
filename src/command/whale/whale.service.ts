import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Command({
  name: 'whale-display',
  description: 'Show all whales holders (51)',
})
@Injectable()
export class WhaleService extends CommandRunner {
  private static readonly logger = new Logger(WhaleService.name);

  constructor(private alchemyService: AlchemyService) {
    super();
  }

  async run() {
    WhaleService.logger.log('[Command] WhaleService');
    const data = await this.alchemyService.getOwnersForCollectionML();
    let nbWhale = 0;
    data.ownerAddresses.forEach((dataHolder) => {
      const tokenIds = [];
      dataHolder.tokenBalances.forEach((dataNft) => {
        const tokenId = parseInt(dataNft.tokenId, 16);
        tokenIds.push(tokenId);
      });
      if (tokenIds.length >= 51) {
        console.log(`${dataHolder.ownerAddress} (${tokenIds.length})`);
        nbWhale++;
      }
    });
    console.log('nb whales: ' + nbWhale);
  }
}
