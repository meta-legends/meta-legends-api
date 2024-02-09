import {
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { LegendService } from '@src/legend/legend.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { UserService } from '@src/user/user.service';
import { HoldingRewardService } from '@src/holding-reward/holding-reward.service';
import { CouncilStoneService } from '@src/collections/council-stone/council-stone.service';
import { HonoraryService } from '@src/collections/honorary/honorary.service';
import { WeaponSkinService } from '@src/collections/weapon-skin/weapon-skin.service';
import { PerkArmorService } from '@src/collections/perk-armor/perk-armor.service';
import { PerkOgPetService } from '@src/collections/perk-og-pet/perk-og-pet.service';
import { VehicleService } from '@src/collections/vehicle/vehicle.service';
import { PerkOgResidenceService } from '@src/collections/perk-og-residence/perk-og-residence.service';

@Controller('holders')
export class HolderController {
  constructor(
    private legendService: LegendService,
    private userService: UserService,
    private holdingRewardService: HoldingRewardService,
    private councilStoneService: CouncilStoneService,
    private honoraryService: HonoraryService,
    private weaponSkinService: WeaponSkinService,
    private perkArmorService: PerkArmorService,
    private perkOgPetService: PerkOgPetService,
    private vehicleService: VehicleService,
    private residenceService: PerkOgResidenceService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/meta-legends')
  async getMetaLegends(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const cache = await this.cacheManager.get('legend-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.legendService.getNfts(wallet);
    await this.cacheManager.set('legend-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/holding-rewards')
  async getHoldingRewards(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const user = await this.userService.findOne(wallet);
    return await this.holdingRewardService.findByUser(user);
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/council-stones')
  async getCouncilStones(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const cache = await this.cacheManager.get('council-stone-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.councilStoneService.getNfts(wallet);
    await this.cacheManager.set('council-stone-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/honoraries')
  async getHonories(@Req() request: Request, @Param('wallet') wallet: string) {
    const cache = await this.cacheManager.get('honorary-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.honoraryService.getNfts(wallet);
    await this.cacheManager.set('honorary-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/weapon-skins')
  async getWeaponSkins(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const cache = await this.cacheManager.get('weapon-skin-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.weaponSkinService.getNfts(wallet);
    await this.cacheManager.set('weapon-skin-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/perk-armors')
  async getPerkArmors(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const cache = await this.cacheManager.get('perk-armor-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.perkArmorService.getNfts(wallet);
    await this.cacheManager.set('perk-armor-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/perk-pets')
  async getPerkPets(@Req() request: Request, @Param('wallet') wallet: string) {
    const cache = await this.cacheManager.get('perk-og-pet-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.perkOgPetService.getNfts(wallet);
    await this.cacheManager.set('perk-og-pet-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/perk-vehicles')
  async getPerkVehicles(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    const cache = await this.cacheManager.get('vehicle-get-' + wallet);
    if (cache != null) {
      return cache;
    }
    const result = await this.vehicleService.getNfts(wallet);
    await this.cacheManager.set('vehicle-get-' + wallet, result, 3600000);
    return result;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/perk-residences')
  async getPerkResidences(
    @Req() request: Request,
    @Param('wallet') wallet: string,
  ) {
    return await this.residenceService.getNfts(wallet);
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':wallet/perk-lands')
  async getPerkLands() {
    return [];
  }
}
