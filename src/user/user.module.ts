import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';

import { UserService } from './user.service';
import { CachingEachUserService } from './caching-each-user/caching-each-user.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [AlchemyService, UserService, CachingEachUserService],
  controllers: [UserController],
})
export class UserModule {}
