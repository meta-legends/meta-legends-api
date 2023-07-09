import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONTRACT_META_LEGENDS } from '@src/enum/contract';

export const isHolderOfCollection = 'isHolderOfCollection';
export const GET_CONTRACTS_FOR_OWNER = 'getContractsForOwner';
export const GET_OWNERS_FOR_COLLECTION = 'getOwnersForCollection';
export const GET_NFTS = 'getNFTs';

@Injectable()
export class AlchemyService {
  async get(method: string, data) {
    const params = new URLSearchParams(data);
    const alchemyUrl = process.env.ALCHEMY_URL;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    const url = `${alchemyUrl}/nft/v2/${alchemyApiKey}/${method}?${params.toString()}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get all holders of ML with their tokens
   */
  async getOwnersForCollectionML() {
    const data = {};
    data['contractAddress'] = CONTRACT_META_LEGENDS;
    data['withTokenBalances'] = true;

    return this.get(GET_OWNERS_FOR_COLLECTION, data);
  }

  async getNFTsByWallet(wallet: string, pageKey = '') {
    const data = {
      'contractAddresses[]': CONTRACT_META_LEGENDS,
      owner: wallet,
      withMetadata: true,
    };

    if (pageKey != '') {
      data['pageKey'] = pageKey;
    }

    return this.get(GET_NFTS, data);
  }
}
