import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_ETH,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_PERK_ARMOR } from '@src/enum/contract';
import { URL_FILES_ARMOR } from '@src/enum/project-file';

@Injectable()
export class PerkArmorService {
  private static readonly logger = new Logger(PerkArmorService.name);

  constructor(private readonly alchemyService: AlchemyService) {
  }

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_PERK_ARMOR,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_ETH,
    );
    const result = [];
    response.ownedNfts.map((armor) => {
      const armorName = this.buildName(armor.metadata.attributes).toLowerCase();
      const data = {
        tokenId: parseInt(armor.id.tokenId, 16),
        image: armor.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
        name: this.buildName(armor.metadata.attributes),
        animation: armor.metadata.animation_url,
        projectFileUrl:
          URL_FILES_ARMOR[armorName] !== undefined
            ? URL_FILES_ARMOR[armorName]
            : '',
      };
      result.push(data);
    });
    return result;
  }

  buildName(attributes: object[]): string {
    const object = {};
    attributes.forEach((attribute) => {
      object[attribute['trait_type'].toLowerCase()] = attribute['value'];
    });
    return `${object['class']} ${object['category']} ${object['skin']}`;
  }
}
