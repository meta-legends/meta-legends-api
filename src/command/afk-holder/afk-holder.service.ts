import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { LegendService } from '@src/legend/legend.service';

// npm run command-nest save-unregisted-legend
@Command({
  name: 'save-unregisted-legend',
  description: 'Save unconnect legends',
})
@Injectable()
export class AfkHolderService extends CommandRunner {
  private static readonly logger = new Logger(AfkHolderService.name);

  constructor(
    private legendService: LegendService,
    private alchemyService: AlchemyService,
  ) {
    super();
  }

  async run() {
    AfkHolderService.logger.log('[Command] AfkHolderService');
    const unconnectHolders = {};
    let nbUnsaveToken = 0;

    const walletHolders = await this.getWalletHolders();
    const data = await this.alchemyService.getOwnersForCollectionML();
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

    console.log(unconnectHolders);
    // try {
    //   await this.parseAfkLegends(unconnectHolders);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async getWalletHolders(): Promise<string[]> {
    const legends = await this.legendService.findAll();
    const walletHolders = [];
    legends.map((legend) => {
      if (!walletHolders.includes(legend.address)) {
        walletHolders.push(legend.address);
      }
    });

    return walletHolders;
  }

  async parseAfkLegends(unconnectHolders: object) {
    const wallets = Object.keys(unconnectHolders);
    for (let index = 0; index <= wallets.length; index++) {
      if ((index + 1) % 3 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Attendre 1 seconde (ajustez le délai selon vos besoins)
        console.log('wait');
        try {
          await this.legendService.getNfts(wallets[index]);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('off');
        try {
          await this.legendService.getNfts(wallets[index]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
