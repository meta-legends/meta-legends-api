import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { Asset } from '@src/asset/asset.entity';
import { User } from '@src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mint } from '@src/mint/mint.entity';
import { MintInsertDto } from '@src/mint/mint-insert.dto';
import { MintMonitoringService } from '@src/mint-monitoring/mint-monitoring.service';

import { OG_PET_RANDOM_MINT } from '@src/enum/eligibility-mint-og-pet';
import { MintMonitoring } from '@src/mint-monitoring/mint-monitoring.entity';
import {
  PINATA_URL,
  URI_OG_PETS_GIF,
  URI_OG_PETS_VIDEO,
} from '@src/enum/pinata-uri';
import {
  OG_PET_RANDOM_METADATA,
  OG_PET_SPECIFIC_METADATA,
} from '@src/enum/metadata-attribute';
import {
  RuntimeException,
  UnknownElementException,
} from '@nestjs/core/errors/exceptions';
import { PinataService } from '@src/client/pinata/pinata.service';

@Injectable()
export class MintService {
  constructor(
    @InjectRepository(Mint)
    private mintRepository: Repository<Mint>,
    private mintMonitoringService: MintMonitoringService,
    private pinataService: PinataService,
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

    if (!OG_PET_RANDOM_METADATA.hasOwnProperty(name.toUpperCase())) {
      throw new UnknownElementException(
        `Unknow OG Pet name ${name.toUpperCase()}`,
      );
    }

    return OG_PET_RANDOM_METADATA[name.toUpperCase()];
  }

  async triggerMinted(user: User, asset: Asset) {
    const mintMonitorings = this.mintMonitoringService.getByAsset(asset);
  }

  suffle(mintMonitorings: MintMonitoring[]): MintMonitoring | null {
    if (mintMonitorings.length == 0) {
      throw new BadRequestException('Data mint monitorings is empty');
    }

    let totalChances = 0;
    mintMonitorings.forEach((mintMonitoring) => {
      totalChances += mintMonitoring.rarity;
    });

    const random = Math.random() * totalChances;
    let lucky = 0;
    for (let i = 0; i < mintMonitorings.length; i++) {
      const randomMintDraw: MintMonitoring = mintMonitorings[i];

      if (mintMonitorings[randomMintDraw.name] == randomMintDraw.supply) {
        continue;
      }

      lucky += randomMintDraw.rarity;

      if (random < lucky) {
        return randomMintDraw;
      }
    }

    return null;
  }
}
