import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_ETH,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_VEHICLE } from '@src/enum/contract';
import { URL_FILES_VEHICLE } from '@src/enum/project-file';

@Injectable()
export class VehicleService {
  private static readonly logger = new Logger(VehicleService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_VEHICLE,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_ETH,
    );
    const result = [];
    response.ownedNfts.map((vehicle) => {
      const vehicleName = this.buildName(
        vehicle.metadata.attributes,
      ).toLowerCase();
      const data = {
        tokenId: parseInt(vehicle.id.tokenId, 16),
        image: vehicle.metadata.image,
        name: this.buildName(vehicle.metadata.attributes),
        animation: vehicle.metadata.animation_url,
        projectFileUrl:
          URL_FILES_VEHICLE[vehicleName] !== undefined
            ? URL_FILES_VEHICLE[vehicleName]
            : '',
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
