import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Asset } from '@src/mint/asset/asset.entity';
import { MintOrder } from '@src/mint-order/mint-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, MintOrder])],
  exports: [TypeOrmModule],
  providers: [],
})
export class MintModule {}
