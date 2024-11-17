import { Controller, Get, Header, Inject, UseGuards } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';

import { LandService } from '@src/land/land.service';
import { LandMintedService } from '@src/land/land-minted/land-minted.service';

@Controller('lands')
export class LandController {
  constructor(
    private landService: LandService,
    private landMintedService: LandMintedService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get()
  async getAll() {
    const cacheName = `land-get-all`;
    const cache = await this.cacheManager.get(cacheName);
    if (cache != null) {
      return cache;
    }
    const lands = await this.landService.findAll();
    const result = await Promise.all(
      lands.map(async (land) => {
        const count = await this.landMintedService.remaining(land);
        return {
          item: land,
          remaining: land.supply - count,
        };
      }),
    );
    await this.cacheManager.set(cacheName, result, 3600000);
    return result;
  }
}
