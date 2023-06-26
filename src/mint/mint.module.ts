import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mint } from '@src/mint/mint.entity';
import { Asset } from '@src/asset/asset.entity';
import { User } from '@src/user/user.entity';
import { MintService } from './mint.service';
import { UserService } from '@src/user/user.service';
import { AssetService } from '@src/asset/asset.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { MintController } from './mint.controller';
import { MintMonitoringService } from '@src/mint-monitoring/mint-monitoring.service';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Mint, User, MintMonitoring])],
  exports: [TypeOrmModule],
  providers: [
    AssetService,
    AlchemyService,
    MintService,
    UserService,
    MintMonitoringService,
  ],
  controllers: [MintController],
})
export class MintModule {}
