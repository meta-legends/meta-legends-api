import {
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from '@src/collection/collection.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('/owned/:blockchain/:network/:collection')
  async getNFTsOwned(
    @Req() request: Request,
    @Param('blockchain') blockchain: string,
    @Param('network') network: string,
    @Param('collection') collection: string,
  ): Promise<unknown | object[]> {
    const wallet = request['user-wallet'];
    const cacheName = `collection-get-${blockchain}-${network}-${collection}-${wallet}`;
    const cache = await this.cacheManager.get(cacheName);
    if (cache != null) {
      return cache;
    }
    this.collectionService.defineBlockchainAndNetwork(blockchain, network);
    const result = await this.collectionService.getNFTsForOwner(
      collection,
      wallet,
    );
    await this.cacheManager.set(cacheName, result, 3600000);
    return result;
  }
}
