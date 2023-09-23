import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyService,
  GET_NFTS,
  NETWORK_POLYGON,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_LZ_REWARDS } from '@src/enum/contract';

@Injectable()
export class LzAssetService {
  private static readonly logger = new Logger(LzAssetService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_LZ_REWARDS,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(
      GET_NFTS,
      params,
      NETWORK_POLYGON,
    );
    const result = [];
    response.ownedNfts.map((asset) => {
      const data = {
        tokenId: parseInt(asset.id.tokenId, 16),
        image: asset.metadata.image,
        name: asset.title,
        balance: asset.balance,
      };
      result.push(data);
      console.log(asset);
    });
    return result;
  }
}
