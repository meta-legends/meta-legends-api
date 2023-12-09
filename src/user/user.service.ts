import {
  BadRequestException,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserUpdateDto } from './user-update.dto';
import {
  AlchemyService,
  isHolderOfCollection,
  NETWORK_ETH,
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
    return await this.alchemyService.get(
      isHolderOfCollection,
      params,
      NETWORK_ETH,
    );
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

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
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

  async upsert(wallet: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ wallet });
    if (user == null) {
      const user = await this.create(wallet);
      await this.userRepository.insert(user);
      return user;
    }
    user.lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.userRepository.save(user);
    return user;
  }

  async update(user: User, userUpdateDto: UserUpdateDto): Promise<User> {
    if (user.username !== userUpdateDto.username) {
      const user = await this.userRepository.findOneBy({
        username: userUpdateDto.username,
      });
      if (user !== null) {
        throw new BadRequestException(
          `Username '${userUpdateDto.username}' already exist`,
        );
      }
    }
    const updatedUser = Object.assign(user, userUpdateDto);
    return this.userRepository.save(updatedUser);
  }

  async usernameIsAvailable(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username });
    if (user !== null) {
      return false;
    }
    return true;
  }

  async emailIsAvailable(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    if (user !== null) {
      return false;
    }
    return true;
  }
}
