import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_ETH,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_PERK_PETS } from '@src/enum/contract';
import { URL_FILES_PET } from '@src/enum/project-file';

@Injectable()
export class PerkOgPetService {
  private static readonly logger = new Logger(PerkOgPetService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_PERK_PETS,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_ETH,
    );
    const result = [];
    response.ownedNfts.map((pet) => {
      const petName = this.buildName(pet.metadata.attributes).toLowerCase();
      const data = {
        tokenId: parseInt(pet.id.tokenId, 16),
        image: pet.metadata.image,
        name: this.buildName(pet.metadata.attributes),
        animation: pet.metadata.animation_url,
        projectFileUrl:
          URL_FILES_PET[petName] !== undefined ? URL_FILES_PET[petName] : '',
      };
      result.push(data);
    });
    return result;
  }

  buildName(attributes: object[]): string {
    let name;
    attributes.forEach((attribute) => {
      if (attribute['trait_type'] === 'Name') {
        name = attribute['value'];
      }
    });
    return name;
  }
}
