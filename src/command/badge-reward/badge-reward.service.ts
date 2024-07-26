import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
// npm run command-nest badge-reward-snapshot
@Command({
  name: 'badge-reward-snapshot',
  description: 'Define badge reward',
})
@Injectable()
export class BadgeRewardService extends CommandRunner {
  private static readonly logger = new Logger(BadgeRewardService.name);

  constructor(private alchemyService: AlchemyService) {
    super();
  }

  async run() {
    BadgeRewardService.logger.log('[Command] BadgeRewardService');
    const data = await this.alchemyService.getOwnersForCollectionML();
    // let nbHolders = 0;
    let holders = {};
    data.ownerAddresses.forEach((dataHolder) => {

      // const tokenIds = [];
      //
      // dataHolder.tokenBalances.forEach((dataNft) => {
      //   const tokenId = parseInt(dataNft.tokenId, 16);
      //   tokenIds.push(tokenId);
      // });
      // if (tokenIds.length >= 51) {
      holders[dataHolder.ownerAddress] = dataHolder.tokenBalances.length;
      // console.log(
      //   `${dataHolder.ownerAddress} (${dataHolder.tokenBalances.length})`,
      // );
      //   nbHolders++;
      // }
    });
    console.log(holders);
    console.log('nb Holders: ' + data.ownerAddresses.length);
  }
}
