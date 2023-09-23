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
import { LzAssetService } from '@src/collections/lz-asset/lz-asset.service';

@Controller('lz-assets')
export class LzAssetController {
  constructor(
    private lzAssetService: LzAssetService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('lz-asset-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.lzAssetService.getNfts(address);
    await this.cacheManager.set('lz-asset-get-' + address, result, 3600000);
    return result;
  }
}
