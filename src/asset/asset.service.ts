import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Asset } from '../asset/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
  ) {}

  findOneByCode(code: string): Promise<Asset | null> {
    return this.assetRepository.findOneBy({ code });
  }
}
