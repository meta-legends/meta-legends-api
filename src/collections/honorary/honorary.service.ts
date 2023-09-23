import { Injectable, Logger } from '@nestjs/common';
import { AlchemyService, GET_NFTS, NETWORK_ETH } from "@src/client/alchemy/alchemy.service";
import { CONTRACT_HONORARY } from '@src/enum/contract';

@Injectable()
export class HonoraryService {
  private static readonly logger = new Logger(HonoraryService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_HONORARY,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(GET_NFTS, params, NETWORK_ETH);
    const result = [];
    response.ownedNfts.map((honorary) => {
      if (honorary.title.includes('Meta Legends Honorary')) {
        const str = honorary.title.split('#');
        const data = {
          tokenId: parseInt(str[1]),
          image: honorary.media[0].thumbnail,
          name: honorary.title,
        };
        result.push(data);
      }
    });
    return result;
  }
}
