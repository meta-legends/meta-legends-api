import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

import { ApiKeyStrategy } from './apiKey.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
