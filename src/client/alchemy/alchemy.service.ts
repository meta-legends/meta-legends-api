import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONTRACT_META_LEGENDS } from '../../enum/contract';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

export const isHolderOfCollection = 'isHolderOfCollection';
export const GET_OWNERS_FOR_COLLECTION = 'getOwnersForCollection';
export const GET_NFTS = 'getNFTs';

export const NETWORK_ETH = 'eth-mainnet';
export const NETWORK_POLYGON = 'polygon-mainnet';
export const NETWORKS = [NETWORK_ETH, NETWORK_POLYGON];

@Injectable()
export class AlchemyService {
  buildUrl(network: string): string {
    if (!NETWORKS.includes(network)) {
      console.log(`Unknow network ${network}`);
      new RuntimeException(`Unknow network ${network}`);
    }
    return `https://${network}.g.alchemy.com`;
  }

  async get(method: string, data, network: string) {
    const params = new URLSearchParams(data);
    const alchemyUrl = this.buildUrl(network);
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

    return this.get(GET_OWNERS_FOR_COLLECTION, data, NETWORK_ETH);
  }

  async getNFTsByWallet(wallet: string, pageKey = '') {
    const params = {
      'contractAddresses[]': CONTRACT_META_LEGENDS,
      owner: wallet,
      withMetadata: true,
    };

    if (pageKey != '') {
      params['pageKey'] = pageKey;
    }

    return this.get(GET_NFTS, params, NETWORK_ETH);
  }
}
