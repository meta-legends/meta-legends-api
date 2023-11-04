import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { EligibilityController } from './eligibility/eligibility.controller';
import { MintPackageController } from './mint-package/mint-package.controller';
import { LegendController } from './legend/legend.controller';
import { RewardController } from './reward/reward.controller';
import { UserController } from './user/user.controller';

import { AssetService } from './asset/asset.service';
import { AppService } from './app.service';
import { BadgeService } from './reward/badge/badge.service';
import { DatetimeService } from './utils/datetime/datetime.service';
import { OgPetService } from './eligibility/og-pet/og-pet.service';
import { MintPackageService } from './mint-package/mint-package.service';
import { LegendService } from './legend/legend.service';
import { RewardService } from './reward/reward.service';
import { TokenService } from './reward/token/token.service';
import { UnstakedService } from './reward/unstaked/unstaked.service';
import { UserService } from './user/user.service';

import { AlchemyService } from './client/alchemy/alchemy.service';
import { EtherscanService } from './client/etherscan/etherscan.service';
import { MoralisService } from './client/moralis/moralis.service';

import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { MintPackageModule } from './mint-package/mint-package.module';
import { RewardModule } from './reward/reward.module';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';

import { Asset } from './asset/asset.entity';
import { Eligibility } from './eligibility/eligibility.entity';
import { Legend } from './legend/legend.entity';
import { MintPackage } from './mint-package/mint-package.entity';
import { OgPet } from './eligibility/og-pet/og-pet.entity';
import { Unstaked } from './reward/unstaked/unstaked.entity';
import { User } from './user/user.entity';

import { AuthMiddleware } from './middleware/auth.middleware';
import { TestService } from './command/test/test.service';
import { WhaleService } from './command/whale/whale.service';
import { HoldingRewardModule } from './holding-reward/holding-reward.module';
import { HoldingReward } from '@src/holding-reward/holding-reward.entity';
import { HoldingRewardService } from './holding-reward/holding-reward.service';

import { HoldingRewardService as HoldingRewardCommand } from './command/holding-reward/holding-reward.service';
import { AfkHolderService } from './command/afk-holder/afk-holder.service';
import { CollectionsModule } from './collections/collections.module';
import { HealingDroneService as HealingDroneServiceCommand } from './command/metadata/healing-drone/healing-drone.service';
import { MetadataService } from './metadata/metadata.service';
import { HealingDroneService } from '@src/collections/healing-drone/healing-drone.service';
import { FileService } from './file/file.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      max: 10000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Asset,
        Eligibility,
        HoldingReward,
        Legend,
        MintPackage,
        OgPet,
        Unstaked,
        User,
      ],
      synchronize: true,
    }),
    AuthModule,
    UtilsModule,
    MintPackageModule,
    RewardModule,
    ClientModule,
    EligibilityModule,
    UserModule,
    AssetModule,
    HoldingRewardModule,
    CollectionsModule,
  ],
  controllers: [
    AppController,
    EligibilityController,
    LegendController,
    MintPackageController,
    RewardController,
    UserController,
  ],
  providers: [
    AppService,
    AssetService,
    AlchemyService,
    BadgeService,
    DatetimeService,
    EtherscanService,
    LegendService,
    MintPackageService,
    MoralisService,
    OgPetService,
    TokenService,
    RewardService,
    UnstakedService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    MetadataService,
    TestService,
    WhaleService,
    HoldingRewardService,
    HoldingRewardCommand,
    AfkHolderService,
    HealingDroneService,
    HealingDroneServiceCommand,
    FileService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
