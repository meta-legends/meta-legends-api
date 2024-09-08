import { Injectable } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

export const NETWORKS = {
  eth: ['mainnet', 'sepolia'],
  polygon: ['mainnet', 'amoy'],
};

@Injectable()
export class AlchemyV3Service {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.ALCHEMY_API_KEY;
  }

  buildUrl(blockchain: string, network: string): string {
    if (!Object.keys(NETWORKS).includes(blockchain)) {
      const message = `Unknow blockchain ${blockchain}`;
      console.log(message);
      new RuntimeException(message);
    }
    if (!NETWORKS[blockchain].includes(network)) {
      const message = `Unknow network ${network}`;
      console.log(message);
      new RuntimeException(message);
    }
    return `https://${blockchain}-${network}.g.alchemy.com/`;
  }
}
