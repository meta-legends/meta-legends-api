import { Controller, Get, Header, Inject, Param } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LegendService } from './legend.service';

@Controller('legends')
export class LegendController {
  constructor(
    private legendService: LegendService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Header('content-type', 'application/json')
  @Get(':walletAddress')
  async get(
    @Param('walletAddress') walletAddress: string,
  ): Promise<unknown | object[]> {
    const address = walletAddress.toLowerCase();

    const cache = await this.cacheManager.get('legend-get-' + address);
    if (cache != null) {
      return cache;
    }

    const result = await this.legendService.getNfts(address);

    await this.cacheManager.set('legend-get-' + address, result, 3600000);

    return result;
  }
}
