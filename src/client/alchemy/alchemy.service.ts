import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  CONTRACT_COUNCIL_STONE,
  CONTRACT_HONORARY,
  CONTRACT_META_LEGENDS,
} from '../../enum/contract';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

export const isHolderOfCollection = 'isHolderOfCollection';
export const GET_OWNERS_FOR_COLLECTION = 'getOwnersForCollection';
export const GET_OWNERS_FOR_TOKEN = 'getOwnersForToken';

export const GET_NFTS_FOR_COLLECTION = 'getNFTsForCollection';
export const GET_NFTS = 'getNFTs';

export const NETWORK_ETH = 'eth-mainnet';
export const NETWORK_POLYGON = 'polygon-mainnet';
export const NETWORK_SEPOLIA = 'eth-sepolia';
export const NETWORKS = [NETWORK_ETH, NETWORK_POLYGON, NETWORK_SEPOLIA];

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
    const params = {};
    params['contractAddress'] = CONTRACT_META_LEGENDS;
    params['withTokenBalances'] = true;

    return this.get(GET_OWNERS_FOR_COLLECTION, params, NETWORK_ETH);
  }

  async getOwnersForCollectionHonorary() {
    const params = {};
    params['collectionSlug'] = 'ml-honorary';
    params['withMetadata'] = true;

    return this.get(GET_NFTS_FOR_COLLECTION, params, NETWORK_ETH);
  }

  async getOwnersForCollectionCouncil() {
    const params = {};
    params['contractAddress'] = CONTRACT_COUNCIL_STONE;
    params['withTokenBalances'] = true;

    return this.get(GET_OWNERS_FOR_COLLECTION, params, NETWORK_ETH);
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
