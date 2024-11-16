import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  Res, StreamableFile,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';
import { Public } from '@src/common/decorators/public.decorator';
import {createReadStream} from "fs";
import { join } from 'path';

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
    const landWish = await this.landWishService.get(id);
    if (landWish === null) {
      throw new NotFoundException('Unknow token ID ' + id);
    }
    const className = landWish.land.class;
    const category = landWish.category;
    return {
      name: 'Meta-Life OG Land #' + id,
      description:
        'This NFT represents an OG Land whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: 'https://ml-api.handosensei.com/lands/' + id + '/image',
      animation_url: 'https://ml-api.handosensei.com/lands/' + id + '/image',
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
  }

  @Public()
  @Get('/:id/image')
  async getImage(@Param('id') id: number): Promise<StreamableFile> {
    const landWish = await this.landWishService.get(id);
    if (landWish === null) {
      throw new NotFoundException('Unknow token ID ' + id);
    }

    const land = landWish.land;
    console.log(land);
    const file = createReadStream(
      join(
        __dirname,
        `../../../data/land/images/${land.class.toUpperCase()}-AREA-${
          land.area
        }.png`,
      ),
    );
    return new StreamableFile(file, {
      type: 'image/png',
      disposition: 'attachment; filename="land.json"',
    });
  }
}
