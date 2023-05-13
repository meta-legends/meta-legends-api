import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Unstaked } from './unstaked.entity';

@Injectable()
export class UnstakedService {
  constructor(
    @InjectRepository(Unstaked)
    private unstakedRepository: Repository<Unstaked>,
  ) {}

  async findOneByWallet(address: string): Promise<Promise<Unstaked> | object> {
    const unstaked = await this.unstakedRepository.findOneBy({ address });
    if (unstaked === null) {
      return {};
    }

    return unstaked;
  }
}
