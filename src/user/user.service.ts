import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  AlchemyService,
  isHolderOfCollection,
} from '@src/client/alchemy/alchemy.service';

import { CONTRACT_META_LEGENDS } from '@src/enum/contract';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private alchemyService: AlchemyService,
  ) {}

  async isHolder(wallet: string) {
    const params = {
      wallet: wallet,
      contractAddress: CONTRACT_META_LEGENDS,
    };
    return this.alchemyService.get(isHolderOfCollection, params);
  }

  @UseInterceptors(CacheInterceptor)
  async cachingHolders() {
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
  }
}
