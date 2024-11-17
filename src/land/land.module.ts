import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@src/auth/auth.module';
import { Land } from '@src/land/land.entity';
import { LandService } from '@src/land/land.service';
import { LandMintedController } from './land-minted/land-minted.controller';
import { LandMinted } from '@src/land/land-minted/land-minted.entity';
import { LandMintedService } from './land-minted/land-minted.service';
import { LandController } from './land.controller';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Land, LandMinted]),
    AuthModule,
  ],
  exports: [TypeOrmModule, LandMintedService],
  controllers: [LandMintedController, LandController],
  providers: [LandService, LandMintedService],
})
export class LandModule {}
