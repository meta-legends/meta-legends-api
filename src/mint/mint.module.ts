import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mint } from '@src/mint/mint.entity';
import { Asset } from '@src/asset/asset.entity';
import { User } from '@src/user/user.entity';
import { MintService } from './mint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Mint, User])],
  exports: [TypeOrmModule],
})
export class MintModule {}
