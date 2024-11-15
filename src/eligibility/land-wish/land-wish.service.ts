import {
  ClassSerializerInterceptor,
  Header,
  Injectable,
  Post,
  UseInterceptors,
} from '@nestjs/common';
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
    const lands = {};
    for (const landWishCreateDto of landWishCreateDtos) {
      if (!(landWishCreateDto.landId in lands)) {
        const land = await this.ogLandService.findOneById(
          landWishCreateDto.landId,
        );
        lands[land.id] = land;
      }
      let landWish = new LandWish();
      landWish.user = user;
      landWish.createdAt = createdAt;
      landWish.land = lands[landWishCreateDto.landId];
      landWish.tokenId = landWishCreateDto.tokenId;
      landWish.category = await this.pickCategory(
        lands[landWishCreateDto.landId],
      );
      landWish = await this.landWishRepository.save(landWish);
      landWishes.push(landWish);
    }
    return landWishes;
  }

  async remaining(land: OgLand) {
    return await this.landWishRepository.countBy({ land });
  }

  async getAll() {
    return await this.landWishRepository.find({
      relations: { land: true, user: true },
      select: {
        user: { wallet: true },
      },
    });
  }

  async pickCategory(land: OgLand): Promise<string> {
    const MAX_LIMITS = {
      legendary: 10,
      sacred: 20,
      normal: 70,
    };
    const categories = {
      legendary: 0,
      sacred: 0,
      normal: 0,
    };
    const landwishes = await this.landWishRepository.find({
      relations: { land: true },
      where: {
        land: {
          class: land.class,
        },
      },
    });
    landwishes.forEach((landWish) => {
      categories[landWish.category]++;
    });

    const remainingSlots = {
      legendary: MAX_LIMITS.legendary - categories.legendary,
      sacred: MAX_LIMITS.sacred - categories.sacred,
      normal: MAX_LIMITS.normal - categories.normal,
    };

    const availableCategories: { category: string; weight: number }[] = [];
    if (remainingSlots.legendary > 0) {
      availableCategories.push({ category: 'legendary', weight: 10 });
    }
    if (remainingSlots.sacred > 0) {
      availableCategories.push({ category: 'sacred', weight: 20 });
    }
    if (remainingSlots.normal > 0) {
      availableCategories.push({ category: 'normal', weight: 70 });
    }

    if (availableCategories.length === 0) {
      throw new Error('No category available');
    }

    const totalWeight = availableCategories.reduce(
      (acc, cat) => acc + cat.weight,
      0,
    );
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const cat of availableCategories) {
      cumulativeWeight += cat.weight;
      if (randomValue < cumulativeWeight) {
        return cat.category;
      }
    }

    return 'normal';
  }

  async get(id: number): Promise<LandWish | null> {
    return await this.landWishRepository.findOne({
      relations: { land: true },
      where: {
        id: id,
      },
    });
  }
}
