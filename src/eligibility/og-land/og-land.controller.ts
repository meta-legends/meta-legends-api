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

@Controller(`og-lands`)
export class OgLandController {
  constructor(
    private landService: OgLandService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('/:landId')
  async getLand(@Param('landId') landId: number) {
    const cacheName = `land-get-${landId}`;
    const cache = await this.cacheManager.get(cacheName);
    if (cache != null) {
      return cache;
    }
    const result = await this.landService.findOneById(landId);
    await this.cacheManager.set(cacheName, result, 3600000);
    return result;
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
    const result = await this.landService.findAll();
    await this.cacheManager.set(cacheName, result, 3600000);
    return result;
  }
}
