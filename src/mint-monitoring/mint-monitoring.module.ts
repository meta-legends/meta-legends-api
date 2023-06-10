import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@src/asset/asset.entity';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MintMonitoring, Asset])],
  exports: [TypeOrmModule],
})
export class MintMonitoringModule {}
