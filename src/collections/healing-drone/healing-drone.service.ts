import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_POLYGON,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_HEALING_DRONE } from '@src/enum/contract';

@Injectable()
export class HealingDroneService {
  private static readonly logger = new Logger(HealingDroneService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_HEALING_DRONE,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_POLYGON,
    );
    const result = [];
    response.ownedNfts.map((drone) => {
      const data = {
        tokenId: parseInt(drone.id.tokenId, 16),
        image: drone.metadata.image,
        name: this.buildName(drone.metadata.attributes),
      };
      result.push(data);
    });
    return result;
  }

  buildName(attributes: object[]): string {
    let name;
    attributes.forEach((attribute) => {
      if (attribute['trait_type'] === 'Class') {
        name = attribute['value'];
      }
    });
    return `${name} drone`;
  }
}
