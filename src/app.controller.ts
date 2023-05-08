import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { LegendService } from './reward/legend/legend.service';


@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private legendService: LegendService,
  ) {}

  @Get('/cache/clear')
  async cacheClear() {
    await this.cacheManager.reset();
    return { status: 'success' };
  }

  @Get('/cache/get-all-data')
  async cacheGetData() {
    //Get all keys
    const keys = await this.cacheManager.store.keys();

    //Loop through keys and get data
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    return allData;
  }

  @Get('/hello')
  async getHello() {
    return await this.legendService.getRewardHolding(
      '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd',
    );
  }

  @Get('/hello2')
  async getHello2() {
    return await this.legendService.getNftDataFromAlchemy(
      '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd',
    );
  }
}
