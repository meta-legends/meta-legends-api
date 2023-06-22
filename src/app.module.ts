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
import { UserController } from '@src/user/user.controller';

import { AssetService } from '@src/asset/asset.service';
import { AppService } from './app.service';
import { BadgeService } from './reward/badge/badge.service';
import { DatetimeService } from './utils/datetime/datetime.service';
import { OgPetService } from './eligibility/og-pet/og-pet.service';
import { OrderService } from './command/order/order.service';
import { MintPackageService } from './mint-package/mint-package.service';
import { MintOrderService } from './mint-order/mint-order.service';
import { LegendService } from './legend/legend.service';
import { RewardService } from './reward/reward.service';
import { TokenService } from './reward/token/token.service';
import { UnstakedService } from './reward/unstaked/unstaked.service';
import { UserService } from '@src/user/user.service';

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

import { Asset } from '@src/asset/asset.entity';
import { Legend } from './legend/legend.entity';
import { Mint } from '@src/mint/mint.entity';
import { MintPackage } from './mint-package/mint-package.entity';
import { MintOrder } from '@src/mint-order/mint-order.entity';
import { OgPet } from './eligibility/og-pet/og-pet.entity';
import { Unstaked } from './reward/unstaked/unstaked.entity';
import { User } from '@src/user/user.entity';

import { AuthMiddleware } from './middleware/auth.middleware';
import { MintOrderController } from './mint-order/mint-order.controller';
import { MintOrderModule } from './mint-order/mint-order.module';
import { MintMonitoringModule } from './mint-monitoring/mint-monitoring.module';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';
import { MintModule } from './mint/mint.module';
import { MetadataService } from './command/metadata/metadata.service';
import { TestService } from '@src/command/test/test.service';

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
        MintPackage,
        Mint,
        Unstaked,
        Legend,
        OgPet,
        User,
        Asset,
        MintOrder,
        MintMonitoring,
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
    MintOrderModule,
    MintMonitoringModule,
    MintModule,
  ],
  controllers: [
    AppController,
    EligibilityController,
    LegendController,
    MintPackageController,
    RewardController,
    UserController,
    MintOrderController,
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
    MintOrderService,
    OrderService,
    MetadataService,
    TestService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
