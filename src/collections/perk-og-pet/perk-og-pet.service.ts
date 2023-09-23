import { Injectable, Logger } from '@nestjs/common';
import { AlchemyService, GET_NFTS, NETWORK_ETH } from "@src/client/alchemy/alchemy.service";
import { CONTRACT_PERK_PETS } from '@src/enum/contract';

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
    const response = await this.alchemyService.get(GET_NFTS, params, NETWORK_ETH);
    const result = [];
    response.ownedNfts.map((armor) => {
      const data = {
        tokenId: parseInt(armor.id.tokenId, 16),
        image: armor.metadata.image,
        name: this.buildName(armor.metadata.attributes),
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
