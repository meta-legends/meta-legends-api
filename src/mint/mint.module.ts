import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mint } from '@src/mint/mint.entity';
import { Asset } from '@src/asset/asset.entity';
import { User } from '@src/user/user.entity';
import { MintOrder } from '@src/mint-order/mint-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Mint, MintOrder, User])],
  exports: [TypeOrmModule],
})
export class MintModule {}
