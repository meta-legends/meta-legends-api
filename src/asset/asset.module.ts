import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@src/asset/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  exports: [TypeOrmModule],
  providers: [AssetService],
})
export class AssetModule {}
