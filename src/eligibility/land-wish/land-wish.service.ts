import { Injectable } from '@nestjs/common';
import { User } from '@src/user/user.entity';
import { LandWishCreateDto } from '@src/eligibility/land-wish/land-wish-create.dto';
import { OgLandService } from '@src/eligibility/og-land/og-land.service';
import { LandWish } from '@src/eligibility/land-wish/land-wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { OgLand } from '@src/eligibility/og-land/og-land.entity';

@Injectable()
export class LandWishService {
  constructor(
    @InjectRepository(LandWish)
    private landWishRepository: Repository<LandWish>,
    private ogLandService: OgLandService,
  ) {}

  async add(user: User, landWishCreateDtos: LandWishCreateDto[]) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const landWishes = [];
    for (const landWishCreateDto of landWishCreateDtos) {
      const land = await this.ogLandService.findOneById(
        landWishCreateDto.landId,
      );
      for (let i = 0; i < landWishCreateDto.quantity; i++) {
        let landWish = new LandWish();
        landWish.user = user;
        landWish.createdAt = createdAt;
        landWish.land = land;
        landWish = await this.landWishRepository.save(landWish);
        landWishes.push(landWish);
      }
    }
    return landWishes;
  }

  async remaining(land: OgLand) {
    return await this.landWishRepository.countBy({ land });
  }
}
