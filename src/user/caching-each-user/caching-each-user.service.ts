import { Inject, Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Command({
  name: 'caching-each-user',
  description: 'Caching all holders',
})
@Injectable()
export class CachingEachUserService extends CommandRunner {
  private static readonly logger = new Logger(CachingEachUserService.name);
  constructor(
    private readonly alchemyService: AlchemyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async run() {
    CachingEachUserService.logger.log('[Command] CachingEachUserService');
    const data = await this.alchemyService.getOwnersForCollectionML();
    data.ownerAddresses.forEach((dataHolder) => {
      const tokenIds = [];
      dataHolder.tokenBalances.forEach((dataNft) => {
        const tokenId = parseInt(dataNft.tokenId, 16);
        tokenIds.push(tokenId);
      });
      this.cacheManager.set(
        `holder-${dataHolder.ownerAddress}`,
        tokenIds,
        86400000,
      );
    });

    const keys = await this.cacheManager.store.keys();
    console.log(keys);
    return;
  }
}
