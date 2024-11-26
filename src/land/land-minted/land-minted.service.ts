import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment/moment';

import { User } from '@src/user/user.entity';
import { LandMinted } from '@src/land/land-minted/land-minted.entity';

import { LandService } from '@src/land/land.service';

import { LandMintedCreateDto } from '@src/land/land-minted/land-minted-create.dto';
import { Land } from '@src/land/land.entity';
import { LANDS_IMG } from '@src/enum/land-image';
import { LandContentService } from '@src/land/land-content/land-content.service';

@Injectable()
export class LandMintedService {
  constructor(
    @InjectRepository(LandMinted)
    private landMintedRepository: Repository<LandMinted>,
    private LandService: LandService,
    private landContentService: LandContentService,
  ) {}

  async add(user: User, landMintedCreateDtos: LandMintedCreateDto[]) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const landsMinted = [];
    const lands = {};
    for (const landMintedCreateDto of landMintedCreateDtos) {
      if (!(landMintedCreateDto.landId in lands)) {
        const land = await this.LandService.findOneById(
          landMintedCreateDto.landId,
        );
        lands[land.id] = land;
      }
      let landMinted = new LandMinted();
      landMinted.user = user;
      landMinted.createdAt = createdAt;
      landMinted.land = lands[landMintedCreateDto.landId];
      landMinted.tokenId = landMintedCreateDto.tokenId;
      landMinted.category = await this.pickCategory(
        lands[landMintedCreateDto.landId],
      );
      landMinted.guardian = landMinted.category === 'legendary';
      landMinted = await this.landMintedRepository.save(landMinted);
      await this.landContentService.link(landMinted);
      landsMinted.push(landMinted);
    }
    return landsMinted;
  }
  async remaining(land: Land) {
    return await this.landMintedRepository.countBy({ land });
  }

  async getAll() {
    return await this.landMintedRepository.find({
      relations: { land: true, user: true },
      select: {
        user: { wallet: true },
      },
    });
  }

  async pickCategory(land: Land): Promise<string> {
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
    const landsMinted = await this.landMintedRepository.find({
      relations: { land: true },
      where: {
        land: {
          class: land.class,
        },
      },
    });
    landsMinted.forEach((landMinted) => {
      categories[landMinted.category]++;
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

  async getByTokenId(tokenId: number): Promise<LandMinted | null> {
    return await this.landMintedRepository.findOne({
      relations: { land: true, landContent: true },
      where: {
        tokenId: tokenId,
      },
    });
  }

  buildMetadata(landMinted: LandMinted): object {
    const land = landMinted.land;
    const imageName = LANDS_IMG[land.class][land.area];
    const cid = 'QmcqGJwVSeYy4cCBdNccb4Wf2SuTMfw9M7S8Sc3at8gJk4';
    const imageUrl = `https://metalegends.mypinata.cloud/ipfs/${cid}/${imageName}`;

    const className = landMinted.land.class;
    const category = landMinted.category;
    return {
      name: 'Meta-Life OG Land #' + landMinted.tokenId,
      description:
        'This NFT represents an OG Land whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: imageUrl,
      animation_url: imageUrl,
      // animation_url:
      //   'https://legends-zone.meta-legends.com/lands/' + landMinted.tokenId,
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
          value: landMinted.category == 'legendary' ? 'Yes' : 'No',
        },
      ],
    };
  }

  buildDefaultMetadata(tokenId: number): object {
    const imageUrl =
      'https://metalegends.mypinata.cloud/ipfs/QmZYfdGHXG9e9eTQxXB7meGHGu13kfAiMz3Pj6YD8JuwdK';
    return {
      name: 'Meta-Life OG Land #' + tokenId,
      description:
        'This NFT represents an OG Land whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: imageUrl,
      animation_url: imageUrl,
      attributes: [],
    };
  }
}
