import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';
import { Public } from '@src/common/decorators/public.decorator';
import { createReadStream } from 'fs';
import { join } from 'path';
import {LANDS_IMG} from "@src/enum/land-image";

@Controller('lands')
export class LandController {
  constructor(
    private readonly landWishService: LandWishService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Public()
  @Header('content-type', 'application/json')
  @Get('/metadata/:id')
  async getMetadata(@Param('id') id: number) {
    const cache = await this.cacheManager.get('land-minted-metadata-get-' + id);
    if (cache != null) {
      return cache;
    }
    const landWish = await this.landWishService.getByTokenId(id);
    if (landWish === null) {
      throw new NotFoundException('Unknow token ID ' + id);
    }
    const land = landWish.land;
    const imageName = LANDS_IMG[land.class][land.area];
    const cid = 'QmcqGJwVSeYy4cCBdNccb4Wf2SuTMfw9M7S8Sc3at8gJk4';
    const imageUrl = `https://metalegends.mypinata.cloud/ipfs/${cid}/${imageName}`;

    const className = landWish.land.class;
    const category = landWish.category;
    const result = {
      name: 'Meta-Life OG Land #' + id,
      description:
        'This NFT represents an OG Land whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: imageUrl,
      animation_url: imageUrl,
      // animation_url: 'https://legends-zone.meta-legends.com/lands/' + id,
      attributes: [
        {
          trait_type: 'Class',
          value: className[0].toLocaleUpperCase() + className.slice(1),
        },
        {
          trait_type: 'Category',
          value: category[0].toLocaleUpperCase() + category.slice(1),
        },
        {
          trait_type: 'Guardian',
          value: landWish.category == 'legendary' ? 'Yes' : 'No',
        },
      ],
    };
    await this.cacheManager.set(
      'land-minted-metadata-get-' + id,
      result,
      86400000,
    );
    return result;
  }

  @Public()
  @Get('/:id/image')
  async getImage(@Param('id') id: number): Promise<unknown | StreamableFile> {
    const cache = await this.cacheManager.get('land-minted-image-get-' + id);
    if (cache != null) {
      return cache;
    }
    const landWish = await this.landWishService.getByTokenId(id);
    if (landWish === null) {
      throw new NotFoundException('Unknow token ID ' + id);
    }

    const land = landWish.land;
    const file = createReadStream(
      join(
        __dirname,
        `../../../data/land/images/${land.class.toUpperCase()}-AREA-${
          land.area
        }.png`,
      ),
    );
    const result = new StreamableFile(file, {
      type: 'image/png',
      disposition: 'attachment; filename="land.json"',
    });
    await this.cacheManager.set(
      'land-minted-image-get-' + id,
      result,
      86400000,
    );
    return result;
  }
}
