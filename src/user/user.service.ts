import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  AlchemyService,
  isHolderOfCollection,
} from '@src/client/alchemy/alchemy.service';

import { CONTRACT_META_LEGENDS } from '../enum/contract';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as moment from 'moment/moment';

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
        `holder-${dataHolder.ownerAddress.toLowerCase()}`,
        tokenIds,
        86400000, // 1 day
      );
    });
  }

  async findOne(wallet: string): Promise<User | null> {
    return this.userRepository.findOneBy({ wallet });
  }

  create(wallet: string): User {
    const user: User = new User();
    user.wallet = wallet;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    user.createdAt = now;
    user.lastLogin = now;
    user.isActive = true;
    user.isModo = false;
    user.isAdmin = false;

    return user;
  }

  async upsert(wallet: string) {
    let user = await this.userRepository.findOneBy({ wallet });
    if (user == null) {
      user = this.create(wallet);
      await this.userRepository.insert(user);
    } else {
      user.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
      await this.userRepository.save(user);
    }
  }
}
