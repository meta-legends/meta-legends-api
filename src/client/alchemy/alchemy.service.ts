import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AlchemyService {
  async getNFTsByWallet(wallet: string) {
    const alchemyUrl = process.env.ALCHEMY_URL;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    const contract = process.env.CONTRACT_ML;
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

  async getOwnersForCollectionML() {
    const contract = process.env.CONTRACT_ML;
    const alchemyUrl = process.env.ALCHEMY_URL;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    const url = `${alchemyUrl}/nft/v2/${alchemyApiKey}/getOwnersForCollection?contractAddress=${contract}&withTokenBalances=true`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
