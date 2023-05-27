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

import { AppService } from './app.service';
import { BadgeService } from './reward/badge/badge.service';
import { DatetimeService } from './utils/datetime/datetime.service';
import { MintPackageService } from './mint-package/mint-package.service';
import { RewardService } from './reward/reward.service';
import { TokenService } from './reward/token/token.service';
import { OgPetService } from './eligibility/og-pet/og-pet.service';
import { LegendService } from './legend/legend.service';
import { UnstakedService } from './reward/unstaked/unstaked.service';

import { AlchemyService } from './client/alchemy/alchemy.service';
import { EtherscanService } from './client/etherscan/etherscan.service';
import { MoralisService } from './client/moralis/moralis.service';

import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { MintPackageModule } from './mint-package/mint-package.module';
import { RewardModule } from './reward/reward.module';
import { UtilsModule } from './utils/utils.module';

import { Legend } from './legend/legend.entity';
import { MintPackage } from './mint-package/mint-package.entity';
import { Unstaked } from './reward/unstaked/unstaked.entity';
import { OgPet } from './eligibility/og-pet/og-pet.entity';

import { AuthMiddleware } from './middleware/auth.middleware';
import { ClaimModule } from './claim/claim.module';
import { UserModule } from './user/user.module';
import {UserController} from "@src/user/user.controller";
import {UserService} from "@src/user/user.service";

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
      entities: [MintPackage, Unstaked, Legend, OgPet],
      synchronize: true,
    }),
    AuthModule,
    UtilsModule,
    MintPackageModule,
    RewardModule,
    ClientModule,
    EligibilityModule,
    ClaimModule,
    UserModule,
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
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
