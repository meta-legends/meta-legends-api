import {
  Controller,
  Get,
  Header,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PerkOgResidenceService } from '@src/collections/perk-og-residence/perk-og-residence.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';

@Controller('residences')
export class PerkOgResidenceController {
  constructor(
    private residenceService: PerkOgResidenceService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    // const cache = await this.cacheManager.get('residence-get-' + address);
    // if (cache != null) {
    //   return cache;
    // }
    // const result = await this.healingDroneService.getNfts(address);
    // await this.cacheManager.set(
    //   'residence-get-' + address,
    //   result,
    //   3600000,
    // );
    // return result;
    return await this.residenceService.getNfts(address);
  }
}
