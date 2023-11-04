import { Injectable } from '@nestjs/common';

import {
  AlchemyService,
  GET_OWNERS_FOR_TOKEN,
  NETWORK_ETH,
} from '@src/client/alchemy/alchemy.service';
import { CONTRACT_HONORARY } from '@src/enum/contract';

@Injectable()
export class EligibilityService {
  constructor(private alchemyService: AlchemyService) {}

  async getListWhale() {
    const result = {};
    const data = await this.alchemyService.getOwnersForCollectionML();
    data.ownerAddresses.forEach((data) => {
      if (data.tokenBalances.length < 51) {
        return;
      }
      result[data.ownerAddress.toLowerCase()] = Math.floor(
        data.tokenBalances.length / 51,
      );
    });
    return result;
  }

  async getListHonorary() {
    const response = await this.alchemyService.getOwnersForCollectionHonorary();
    const result = {};
    for (const honorary of response.nfts) {
      const params = {
        tokenId: honorary.id.tokenId,
        contractAddress: CONTRACT_HONORARY,
      };
      const res = await this.alchemyService.get(
        GET_OWNERS_FOR_TOKEN,
        params,
        NETWORK_ETH,
      );
      const wallet = res.owners[0];
      if (wallet === '0x000000000000000000000000000000000000dead') {
        continue;
      }
      if (!Object.keys(result).includes(wallet)) {
        result[wallet] = 1;
      } else {
        result[wallet]++;
      }
    }
    return result;
  }

  async getListCouncil() {
    const result = {};
    const data = await this.alchemyService.getOwnersForCollectionCouncil();
    data.ownerAddresses.forEach((data) => {
      result[data.ownerAddress.toLowerCase()] = data.tokenBalances.length;
    });
    return result;
  }
}
