import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EtherscanService {
  async getNFTsByWallet(wallet: string) {
    const mlContract = process.env.CONTRACT_ML;
    const openSeaApiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${mlContract}&address=${wallet}&apikey=${openSeaApiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
