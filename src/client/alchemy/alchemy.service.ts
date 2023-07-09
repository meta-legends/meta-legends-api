import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONTRACT_META_LEGENDS } from '@src/enum/contract';

export const isHolderOfCollection = 'isHolderOfCollection';
export const getContractsForOwner = 'getContractsForOwner';
export const GET_OWNERS_FOR_COLLECTION = 'getOwnersForCollection';

@Injectable()
export class AlchemyService {
  async getNFTsByWallet(wallet: string) {
    const alchemyUrl = process.env.ALCHEMY_URL;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    const contract = CONTRACT_META_LEGENDS;
    const params = new URLSearchParams({
      owner: wallet,
      withMetadata: 'true',
    });
    const url = `${alchemyUrl}/nft/v2/${alchemyApiKey}/getNFTs?contractAddresses[]=${contract}&${params.toString()}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

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

  async getOwnersForCollectionML() {
    const data = {};
    data['contractAddress'] = CONTRACT_META_LEGENDS;
    data['withTokenBalances'] = true;

    return this.get(GET_OWNERS_FOR_COLLECTION, data);
  }
}
