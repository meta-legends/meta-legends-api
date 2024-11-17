import {Controller, Get, Header, Inject, Param, UseGuards} from '@nestjs/common';
import { LandService } from '@src/land/land.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LandMintedService } from '@src/land/land-minted/land-minted.service';
import {AuthGuard} from "@src/auth/auth.guard";

@Controller('lands')
export class LandController {
  constructor(
    private landService: LandService,
    private landMintedService: LandMintedService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('/:landId')
  async getLand(@Param('landId') landId: number) {
    const land = await this.landService.findOneById(landId);
    return {
      land: land,
      remaining: await this.landMintedService.remaining(land),
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
