import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import * as moment from 'moment';
import { FileService } from '@src/file/file.service';
// npm run command-nest badge-reward-snapshot
@Command({
  name: 'badge-reward-snapshot',
  description: 'Define badge reward',
})
@Injectable()
export class BadgeRewardService extends CommandRunner {
  private static readonly logger = new Logger(BadgeRewardService.name);

  constructor(
    private alchemyService: AlchemyService,
    private fileService: FileService,
  ) {
    super();
  }

  async run() {
    BadgeRewardService.logger.log('[Command] BadgeRewardService');
    const data = await this.alchemyService.getOwnersForCollectionML();
    const holders = {};
    data.ownerAddresses.forEach((dataHolder) => {
      holders[dataHolder.ownerAddress] = dataHolder.tokenBalances.length;
    });
    const now = moment().format('YYYYMMDDHHmmss');
    const filepath = `data/${now}_badge-rewards`;

    this.fileService.buildCsv(holders, filepath);
    console.log('nb Holders: ' + data.ownerAddresses.length);
  }
}
