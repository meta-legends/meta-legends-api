import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  AlchemyService,
  getContractsForOwner,
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
    let nbWhale = 0;
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
      if (tokenIds.length >= 51) {
        console.log(dataHolder.ownerAddress + ' ' + tokenIds.length);
        nbWhale++;
      }
    });
    console.log('nb whales: ' + nbWhale);
  }

  async countMLBag(wallet: string) {
    const params = {
      owner: wallet,
    };
    try {
      const data = await this.alchemyService.get(getContractsForOwner, params);
      let count = 0;
      data['contracts'].forEach((contract) => {
        if (contract['address'].toLowerCase() == CONTRACT_META_LEGENDS) {
          count = contract['totalBalance'];
        }
      });
      return count;
    } catch (e) {
      console.error(e);
    }
  }

  findOne(wallet: string): Promise<User | null> {
    return this.userRepository.findOneBy({ wallet });
  }
}
