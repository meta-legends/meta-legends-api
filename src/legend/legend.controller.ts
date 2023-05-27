import {
  Controller,
  Get,
  Header,
  Inject,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LegendService } from './legend.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
@Controller('legends')
export class LegendController {
  constructor(
    private legendService: LegendService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('legend-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.legendService.getNfts(address);
    await this.cacheManager.set('legend-get-' + address, result, 3600000);
    return result;
  }
}
