import { Controller, Get, Header, Inject, Param } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Public } from '@src/common/decorators/public.decorator';

import { LandMintedService } from '@src/land/land-minted/land-minted.service';

@Controller('metadata')
export class LandController {
  constructor(
    private readonly landMintedService: LandMintedService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Public()
  @Header('content-type', 'application/json')
  @Get('/lands-minted/:id')
  async getMetadata(@Param('id') id: number) {
    const cache = await this.cacheManager.get('land-minted-metadata-get-' + id);
    if (cache != null) {
      return cache;
    }
    const landWish = await this.landMintedService.getByTokenId(id);
    if (landWish === null) {
      return this.landMintedService.buildDefaultMetadata(id);
    }
    const result = this.landMintedService.buildMetadata(landWish);
    await this.cacheManager.set(
      'land-minted-metadata-get-' + id,
      result,
      86400000,
    );
    return result;
  }
}
