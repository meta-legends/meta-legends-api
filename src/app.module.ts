import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { MintPackageController } from './mint-package/mint-package.controller';
import { RewardController } from './reward/reward.controller';

import { AppService } from './app.service';
import { BadgeService } from './reward/badge/badge.service';
import { MintPackageService } from './mint-package/mint-package.service';
import { MoralisService } from './client/moralis/moralis.service';
import { EtherscanService } from './client/etherscan/etherscan.service';
import { RewardService } from './reward/reward.service';
import { TokenService } from './reward/token/token.service';
import { UnstakedService } from './reward/unstaked/unstaked.service';

import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { MintPackageModule } from './mint-package/mint-package.module';
import { RewardModule } from './reward/reward.module';

import { MintPackage } from './mint-package/mint-package.entity';
import { Unstaked } from './reward/unstaked/unstaked.entity';

import { AuthMiddleware } from './middleware/auth.middleware';

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
      entities: [MintPackage, Unstaked],
      synchronize: true,
    }),
    MintPackageModule,
    AuthModule,
    RewardModule,
    ClientModule,
  ],
  controllers: [AppController, MintPackageController, RewardController],
  providers: [
    AppService,
    MintPackageService,
    RewardService,
    MoralisService,
    EtherscanService,
    BadgeService,
    TokenService,
    UnstakedService,
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
