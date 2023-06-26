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

@Module({
  imports: [TypeOrmModule.forFeature([Asset, Mint, User])],
  exports: [TypeOrmModule],
  providers: [
    AssetService,
    AlchemyService,
    MintService,
    UserService,
  ],
  controllers: [MintController],
})
export class MintModule {}
