import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class MoralisService {
  async getWalletNFts(
    wallet: string,
    collectionContract: string,
    withMedia: boolean,
  ) {
    try {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });

      return await Moralis.EvmApi.nft.getWalletNFTs({
        chain: '0x1',
        format: 'decimal',
        tokenAddresses: [collectionContract],
        mediaItems: withMedia,
        address: wallet,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getWalletNFtsByMLCollection(wallet: string, withMedia: boolean) {
    return this.getWalletNFts(wallet, process.env.CONTRACT_ML, withMedia);
  }
}
