import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mint } from '@src/mint/mint.entity';

import {
  PINATA_URL,
  URI_OG_PETS_GIF,
  URI_OG_PETS_VIDEO,
} from '@src/enum/pinata-uri';
import {
  OG_PET_RANDOM_METADATA,
  OG_PET_SPECIFIC_METADATA,
} from '@src/enum/metadata-attribute';
import { UnknownElementException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(Mint)
    private mintRepository: Repository<Mint>,
  ) {}

  generateMetadata(id: number, name: string): object {
    const pathImage = PINATA_URL + URI_OG_PETS_GIF;
    const pathAnimation = PINATA_URL + URI_OG_PETS_VIDEO;

    return {
      name: 'Meta Life OG Pets ' + `#${id}`,
      description:
        'This NFT represents an OG Pet whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: `${pathImage}/${id}.gif`,
      animation_url: `${pathAnimation}/${id}.mp4`,
      attributes: this.getOgPetAttribute(name),
    };
  }

  getOgPetAttribute(name: string) {
    if (OG_PET_SPECIFIC_METADATA.hasOwnProperty(name)) {
      return OG_PET_SPECIFIC_METADATA[name];
    }

    if (!OG_PET_RANDOM_METADATA.hasOwnProperty(name)) {
      throw new UnknownElementException(`Unknow OG Pet name ${name}`);
    }

    return OG_PET_RANDOM_METADATA[name];
  }
}
