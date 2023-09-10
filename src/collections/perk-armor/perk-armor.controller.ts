import {
  Controller,
  Get,
  Header,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
import { PerkArmorService } from '@src/collections/perk-armor/perk-armor.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('perk-armors')
export class PerkArmorController {
  constructor(
    private perkArmorService: PerkArmorService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('perk-armor-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.perkArmorService.getNfts(address);
    await this.cacheManager.set('perk-armor-get-' + address, result, 3600000);
    return result;
  }
}
