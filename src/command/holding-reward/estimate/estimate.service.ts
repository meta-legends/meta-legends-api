import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LegendService } from '@src/legend/legend.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import * as moment from 'moment/moment';
import {
  HOLDING_REWARDS_KEY_VALUE,
  HREWARD_12_CODE,
  HREWARD_12_PERIOD,
  HREWARD_15_CODE,
  HREWARD_15_PERIOD,
  HREWARD_18_CODE,
  HREWARD_18_PERIOD,
  HREWARD_1_CODE,
  HREWARD_1_PERIOD,
  HREWARD_21_CODE,
  HREWARD_21_PERIOD,
  HREWARD_24_CODE,
  HREWARD_24_PERIOD,
  HREWARD_3_CODE,
  HREWARD_3_PERIOD,
  HREWARD_6_CODE,
  HREWARD_6_PERIOD,
  HREWARD_9_CODE,
  HREWARD_9_PERIOD,
} from '@src/enum/holding-reward';

// npm run command-nest holding-rewards-estimate
@Command({
  name: 'holding-rewards-estimate',
  description: 'Estimate to define items supply',
})
@Injectable()
export class EstimateService extends CommandRunner {
  private static readonly logger = new Logger(EstimateService.name);

  constructor(
    private legendService: LegendService,
    private alchemyService: AlchemyService,
  ) {
    super();
  }

  async run() {
    EstimateService.logger.log('[Command] EstimateService');
    const countRewards = {
      [HREWARD_1_CODE]: 0,
      [HREWARD_3_CODE]: 0,
      [HREWARD_6_CODE]: 0,
      [HREWARD_9_CODE]: 0,
      [HREWARD_12_CODE]: 0,
      [HREWARD_15_CODE]: 0,
      [HREWARD_18_CODE]: 0,
      [HREWARD_21_CODE]: 0,
      [HREWARD_24_CODE]: 0,
    };
    const legends = await this.legendService.findAll();
    const walletHolders = [];
    legends.map((legend) => {
      const rewards = this.legendService.defineHoldingRewards(
        new Date(legend.purchasedOn),
        moment('20231231', 'YYYYMMDD').toDate(),
      );
      countRewards[HREWARD_1_CODE] += rewards[HREWARD_1_CODE] === true ? 1 : 0;
      countRewards[HREWARD_3_CODE] += rewards[HREWARD_3_CODE] === true ? 1 : 0;
      countRewards[HREWARD_6_CODE] += rewards[HREWARD_6_CODE] === true ? 1 : 0;
      countRewards[HREWARD_9_CODE] += rewards[HREWARD_9_CODE] === true ? 1 : 0;
      countRewards[HREWARD_12_CODE] +=
        rewards[HREWARD_12_CODE] === true ? 1 : 0;
      countRewards[HREWARD_15_CODE] +=
        rewards[HREWARD_15_CODE] === true ? 1 : 0;
      countRewards[HREWARD_18_CODE] +=
        rewards[HREWARD_18_CODE] === true ? 1 : 0;
      countRewards[HREWARD_21_CODE] +=
        rewards[HREWARD_21_CODE] === true ? 1 : 0;
      countRewards[HREWARD_24_CODE] +=
        rewards[HREWARD_24_CODE] === true ? 1 : 0;
      if (!walletHolders.includes(legend.address)) {
        walletHolders.push(legend.address);
      }
    });
    console.log(countRewards);

    const data = await this.alchemyService.getOwnersForCollectionML();
    const unconnectHolders = {};
    let nbUnsaveToken = 0;
    EstimateService.logger.log(
      `[Command] nb holders: ${data.ownerAddresses.length}`,
    );
    data.ownerAddresses.forEach((walletContent) => {
      const wallet = walletContent.ownerAddress.toLowerCase();
      if (walletHolders.includes(wallet)) {
        return;
      }
      unconnectHolders[wallet] = [];
      nbUnsaveToken += walletContent.tokenBalances.length;
      walletContent.tokenBalances.forEach((nft) => {
        const tokenId = parseInt(nft.tokenId, 16);
        unconnectHolders[wallet].push(tokenId);
      });
    });

    EstimateService.logger.log(
      `[Command] nb holders non connectés à la LZ: ${
        Object.keys(unconnectHolders).length
      }`,
    );

    EstimateService.logger.log(
      `[Command] nb token non connectés à la LZ: ${nbUnsaveToken}`,
    );
  }
}
