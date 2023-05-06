import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class MoralisService {
  async getWalletNFtsByMLCollection(wallet: string, withMedia: boolean) {
    try {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });

      return await Moralis.EvmApi.nft.getWalletNFTs({
        chain: '0x1',
        format: 'decimal',
        tokenAddresses: [process.env.CONTRACT_ML],
        mediaItems: withMedia,
        address: wallet,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
