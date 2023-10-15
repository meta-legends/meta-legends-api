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
import { HealingDroneService } from '@src/collections/healing-drone/healing-drone.service';

@Controller('healing-drones')
export class HealingDroneController {
  constructor(
    private healingDroneService: HealingDroneService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    // const cache = await this.cacheManager.get('healing-drone-get-' + address);
    // if (cache != null) {
    //   return cache;
    // }
    // const result = await this.healingDroneService.getNfts(address);
    // await this.cacheManager.set(
    //   'healing-drone-get-' + address,
    //   result,
    //   3600000,
    // );
    // return result;
    return await this.healingDroneService.getNfts(address);
  }
}
