import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@src/asset/asset.entity';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';
import { MintMonitoringService } from './mint-monitoring.service';

@Module({
  imports: [TypeOrmModule.forFeature([MintMonitoring, Asset])],
  exports: [TypeOrmModule],
  providers: [MintMonitoringService],
})
export class MintMonitoringModule {}
