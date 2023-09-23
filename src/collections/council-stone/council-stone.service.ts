import { Injectable, Logger } from '@nestjs/common';
import { AlchemyService, GET_NFTS } from '@src/client/alchemy/alchemy.service';
import { CONTRACT_COUNCIL_STONE } from '@src/enum/contract';

@Injectable()
export class CouncilStoneService {
  private static readonly logger = new Logger(CouncilStoneService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_COUNCIL_STONE,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(GET_NFTS, params);
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
