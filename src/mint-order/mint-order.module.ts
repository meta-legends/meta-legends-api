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

@Module({
  imports: [TypeOrmModule.forFeature([MintOrder, User, Asset])],
  exports: [TypeOrmModule],
  providers: [MintOrderService, UserService, AlchemyService, AssetService],
  controllers: [MintOrderController],
})
export class MintOrderModule {
  constructor(private dataSource: DataSource) {}
}
