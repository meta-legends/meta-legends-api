import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_ETH,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_PERK_RESIDENCE } from '@src/enum/contract';

@Injectable()
export class PerkOgResidenceService {
  private static readonly logger = new Logger(PerkOgResidenceService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_PERK_RESIDENCE,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_ETH,
    );
    const result = [];
    response.ownedNfts.map((residence) => {
      const data = {
        tokenId: parseInt(residence.id.tokenId, 16),
        image: residence.metadata.image,
        name: residence.title,
      };
      result.push(data);
    });
    return result;
  }
}
