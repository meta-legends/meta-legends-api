import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../asset/asset.entity';
import { User } from '../user/user.entity';
import { MintService } from './mint.service';
import { UserService } from '../user/user.service';
import { AssetService } from '../asset/asset.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, User])],
  exports: [TypeOrmModule],
  providers: [
    AssetService,
    AlchemyService,
    MintService,
    UserService,
  ],
  controllers: [],
})
export class MintModule {}
