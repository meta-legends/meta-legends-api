import {
  Controller,
  Get,
  Header,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HonoraryService } from '@src/collections/honorary/honorary.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';

@Controller('honoraries')
export class HonoraryController {
  constructor(
    private honoraryService: HonoraryService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('honorary-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.honoraryService.getNfts(address);
    await this.cacheManager.set('honorary-get-' + address, result, 3600000);
    return result;
  }
}
