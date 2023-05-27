import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  AlchemyService,
  isHolderOfCollection,
} from '@src/client/alchemy/alchemy.service';

import { CONTRACT_META_LEGENDS } from '@src/enum/contract';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private alchemyService: AlchemyService,
  ) {}

  async isHolder(wallet: string) {
    const params = {
      wallet: wallet,
      contractAddress: CONTRACT_META_LEGENDS,
    };
    return this.alchemyService.get(isHolderOfCollection, params);
  }
}
