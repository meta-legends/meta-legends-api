import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MintPackageController } from './mint-package/mint-package.controller';
import { MintPackageService } from './mint-package/mint-package.service';
import { MintPackageModule } from './mint-package/mint-package.module';
import { MintPackage } from './mint-package/mint-package.entity';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RewardModule } from './reward/reward.module';
import { ClientModule } from './client/client.module';
import { RewardController } from './reward/reward.controller';
import { RewardService } from './reward/reward.service';
import { MoralisService } from './client/moralis/moralis.service';
import { BadgeService } from './reward/badge/badge.service';
import { TokenService } from './reward/token/token.service';

@Module({
  imports: [
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
      entities: [MintPackage],
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
    BadgeService,
    TokenService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
