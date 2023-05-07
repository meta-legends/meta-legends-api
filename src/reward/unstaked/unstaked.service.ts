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

  findOneByWallet(address: string): Promise<Unstaked | null> {
    return this.unstakedRepository.findOneBy({ address });
  }
}
