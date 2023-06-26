import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';
import { Asset } from '@src/asset/asset.entity';

@Injectable()
export class MintMonitoringService {
  constructor(
    @InjectRepository(MintMonitoring)
    private mintMonitoringRepository: Repository<MintMonitoring>,
  ) {}

  getByAsset(asset: Asset): Promise<MintMonitoring[] | null> {
    return this.mintMonitoringRepository.findBy({ asset });
  }
}
