import {
  Controller,
  Get,
  Header,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';
import { OgLandService } from '@src/eligibility/og-land/og-land.service';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';

@Controller(`og-lands`)
export class OgLandController {
  constructor(
    private landService: OgLandService,
    private landWishService: LandWishService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('/:landId')
  async getLand(@Param('landId') landId: number) {
    const land = await this.landService.findOneById(landId);
    return {
      land: land,
      remaining: await this.landWishService.remaining(land),
    };
  }

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
        const count = await this.landWishService.remaining(land);
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
