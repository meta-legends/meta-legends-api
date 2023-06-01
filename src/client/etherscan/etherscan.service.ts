import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EtherscanService {
  async getNFTsByWallet(wallet: string, contract: string) {
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contract}&address=${wallet}&apikey=${etherscanApiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
