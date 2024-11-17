import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';
import { Public } from '@src/common/decorators/public.decorator';


@Controller('lands')
export class LandController {
  constructor(
    private readonly landWishService: LandWishService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Public()
  @Header('content-type', 'application/json')
  @Get('/metadata/:id')
  async getMetadata(@Param('id') id: number) {
    const cache = await this.cacheManager.get('land-minted-metadata-get-' + id);
    if (cache != null) {
      return cache;
    }
    const landWish = await this.landWishService.getByTokenId(id);
    if (landWish === null) {
      return this.landWishService.buildDefaultMetadata(id);
    }
    const result = this.landWishService.buildMetadata(landWish);
    await this.cacheManager.set(
      'land-minted-metadata-get-' + id,
      result,
      86400000,
    );
    return result;
  }
}
