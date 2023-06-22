import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintOrder } from '@src/mint-order/mint-order.entity';
import { MintOrderService } from '@src/mint-order/mint-order.service';
import { MintOrderController } from '@src/mint-order/mint-order.controller';
import { DataSource } from 'typeorm';
import { UserService } from '@src/user/user.service';
import { Asset } from '@src/asset/asset.entity';
import { User } from '@src/user/user.entity';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { AssetService } from '@src/asset/asset.service';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, MintOrder, MintMonitoring, User])],
  exports: [TypeOrmModule],
  providers: [MintOrderService, UserService, AlchemyService, AssetService],
  controllers: [MintOrderController],
})
export class MintOrderModule {
  constructor(private dataSource: DataSource) {}
}
