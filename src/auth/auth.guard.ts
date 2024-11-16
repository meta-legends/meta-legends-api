import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true; // Autorise l'accès sans authentification
    }
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const dynamicData = await this.jwtService.decode(token);
      request['user'] = dynamicData;
      const address = dynamicData['verified_credentials'][0]['address'];
      request['user-wallet'] = address.toLowerCase();
    } catch {
      throw new UnauthorizedException();
    }
    if (request['user'] === null) {
      throw new UnauthorizedException();
    }

    const apiKey = request.headers['x-api-key'];

    if (!apiKey) return false;
    return this.authService.validateApiKey(apiKey);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
