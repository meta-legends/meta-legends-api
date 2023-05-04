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
import { TokenRewardController } from './token-reward/token-reward.controller';
import { TokenRewardService } from './token-reward/token-reward.service';
import { TokenRewardModule } from './token-reward/token-reward.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BadgeRewardModule } from './badge-reward/badge-reward.module';

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
    TokenRewardModule,
    AuthModule,
    BadgeRewardModule,
  ],
  controllers: [AppController, MintPackageController, TokenRewardController],
  providers: [AppService, MintPackageService, TokenRewardService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
