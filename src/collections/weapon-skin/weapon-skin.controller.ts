import {
  Controller,
  Get,
  Header,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
import { WeaponSkinService } from '@src/collections/weapon-skin/weapon-skin.service';

@Controller('weapon-skins')
export class WeaponSkinController {
  constructor(
    private weaponSkinService: WeaponSkinService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('weapon-skin-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.weaponSkinService.getNfts(address);
    await this.cacheManager.set('weapon-skin-get-' + address, result, 3600000);
    return result;
  }
}
