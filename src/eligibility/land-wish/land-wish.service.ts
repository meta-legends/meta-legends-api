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

  async add(user: User, landWishCreateDto: LandWishCreateDto) {
    const landWish = new LandWish();
    landWish.user = user;
    landWish.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    landWish.land = await this.ogLandService.findOneById(
      landWishCreateDto.landId,
    );
    return this.landWishRepository.save(landWish);
  }

  async remaining(land: OgLand) {
    return await this.landWishRepository.countBy({ land });
  }
}
