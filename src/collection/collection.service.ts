import { Injectable, Logger } from '@nestjs/common';
import {
  AlchemyV3Service, GET_NFT_METADATA_BATCH,
  GET_NFTS_FOR_OWNER,
} from '@src/client/alchemy-v3/alchemy-v3.service';

@Injectable()
export class CollectionService {
  private static readonly logger = new Logger(CollectionService.name);
  constructor(private readonly alchemyV3Service: AlchemyV3Service) {}

  defineBlockchainAndNetwork(blockchain: string, network: string) {
    this.alchemyV3Service.setBlockchainAndNetwork(blockchain, network);
  }

  async getNFTsForOwner(collection: string, wallet: string): Promise<object[]> {
    const blockchain = this.alchemyV3Service.getBlockchain();
    const network = this.alchemyV3Service.getNetwork();
    const from = `${collection}/${wallet}`;
    CollectionService.logger.log(
      `[CollectionService] Get NFTs for owner on ${blockchain}/${network}/${from}`,
    );
    const params = {
      'contractAddresses[]': collection,
      owner: wallet,
      withMetadata: true,
    };
    let items: any = [];
    let pageKey = 1;
    while (pageKey != null) {
      const res = await this.alchemyV3Service.get(GET_NFTS_FOR_OWNER, params);
      if (res.pageKey != null) {
        params['pageKey'] = res.pageKey;
      }
      pageKey = res.pageKey;
      items = items.concat(res.ownedNfts);
    }
    const result = [];
    items.map((item: any) => {
      const object = {
        tokenId: item.tokenId,
        name: item.name,
        media: item.image,
      };
      result.push(object);
    });
    return result;
  }

  async getNFTsMetadataByTokenIds(collection: string, tokenIds: any) {
    const tokens = [];
    tokenIds.map((tokenId) => {
      tokens.push({
        contractAddress: collection,
        tokenId: tokenId,
        tokenType: 'ERC721',
      });
    });
    const payload = { tokens: tokens };
    const res = await this.alchemyV3Service.post(
      GET_NFT_METADATA_BATCH,
      payload,
    );
    return res['nfts'];
  }
}
