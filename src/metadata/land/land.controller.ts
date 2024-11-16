import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';
import { Public } from '@src/common/decorators/public.decorator';

@Controller('lands')
export class LandController {
  constructor(
    private readonly landWishService: LandWishService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Public()
  @Header('content-type', 'application/json')
  @Get('/metadata/:id')
  async get(@Param('id') id: number) {
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
      image: 'https://legends-zone.meta-legends.com/lands/' + id + '/image',
      // animation_url: 'https://legends-zone.meta-legends.com/lands/' + id,
      attributes: {
        class: className[0].toLocaleUpperCase() + className.slice(1),
        category: category[0].toLocaleUpperCase() + category.slice(1),
        hasGuardian: landWish.category == 'legendary' ? 'Yes' : 'No',
      },
    };
  }
}
