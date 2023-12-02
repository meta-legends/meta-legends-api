import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_ETH,
  NETWORK_SEPOLIA,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_VEHICLE } from '@src/enum/contract';

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
    response.ownedNfts.map((stone) => {
      const data = {
        tokenId: parseInt(stone.id.tokenId, 16),
        image: stone.metadata.image,
        name: stone.title,
      };
      result.push(data);
    });
    return result;
  }
}
