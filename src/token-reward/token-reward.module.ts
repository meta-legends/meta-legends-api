import { Module } from '@nestjs/common';
import { TokenRewardService } from './token-reward.service';
import { TokenRewardController } from './token-reward.controller';
import { MintPackageService } from '../mint-package/mint-package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintPackage } from '../mint-package/mint-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MintPackage])],
  exports: [TypeOrmModule],
  providers: [TokenRewardService, MintPackageService],
  controllers: [TokenRewardController],
})
export class TokenRewardModule {}
