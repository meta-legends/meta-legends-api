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
import { CouncilStoneService } from '@src/collections/council-stone/council-stone.service';

@Controller('council-stones')
export class CouncilStoneController {
  constructor(
    private councilStoneService: CouncilStoneService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('council-stone-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.councilStoneService.getNfts(address);
    await this.cacheManager.set(
      'council-stone-get-' + address,
      result,
      3600000,
    );
    return result;
  }
}
