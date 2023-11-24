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
import { VehicleService } from '@src/collections/vehicle/vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private vehicleService: VehicleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('')
  async get(@Req() request: Request): Promise<unknown | object[]> {
    const address = request['user-wallet'];
    // const cache = await this.cacheManager.get('vehicle-get-' + address);
    // if (cache != null) {
    //   return cache;
    // }
    // const result = await this.healingDroneService.getNfts(address);
    // await this.cacheManager.set(
    //   'vehicle-get-' + address,
    //   result,
    //   3600000,
    // );
    // return result;
    return await this.vehicleService.getNfts(address);
  }
}
