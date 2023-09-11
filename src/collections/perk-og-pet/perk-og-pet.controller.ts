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
import { PerkOgPetService } from '@src/collections/perk-og-pet/perk-og-pet.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('perk-og-pets')
export class PerkOgPetController {
  constructor(
    private perkOgPetService: PerkOgPetService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    const cache = await this.cacheManager.get('perk-og-pet-get-' + address);
    if (cache != null) {
      return cache;
    }
    const result = await this.perkOgPetService.getNfts(address);
    await this.cacheManager.set('perk-og-pet-get-' + address, result, 3600000);
    return result;
  }
}
