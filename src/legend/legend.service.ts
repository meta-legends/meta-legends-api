import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Legend } from './legend.entity';
import { EtherscanService } from '../client/etherscan/etherscan.service';
import {
  AlchemyService,
  GET_CONTRACTS_FOR_OWNER,
} from '../client/alchemy/alchemy.service';
import { CONTRACT_META_LEGENDS } from '../enum/contract';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  HREWARD_1_CODE,
  HREWARD_1_DURATION,
  HREWARD_3_CODE,
  HREWARD_3_DURATION,
  HREWARD_6_CODE,
  HREWARD_6_DURATION,
  HREWARD_9_CODE,
  HREWARD_9_DURATION,
  HREWARD_12_CODE,
  HREWARD_12_DURATION,
  HREWARD_15_CODE,
  HREWARD_15_DURATION,
  HREWARD_18_CODE,
  HREWARD_18_DURATION,
  HREWARD_21_CODE,
  HREWARD_21_DURATION,
  HREWARD_24_CODE,
  HREWARD_24_DURATION,
} from '../enum/holding-reward';

@Injectable()
export class LegendService {
  constructor(
    @InjectRepository(Legend) private legendRepository: Repository<Legend>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly etherscanService: EtherscanService,
    private readonly alchemyService: AlchemyService,
  ) {}

  async getCountML(wallet: string) {
    const params = {
      owner: wallet,
    };
    try {
      const data = await this.alchemyService.get(
        GET_CONTRACTS_FOR_OWNER,
        params,
      );
      let count = 0;
      data['contracts'].forEach((contract) => {
        if (contract['address'].toLowerCase() == CONTRACT_META_LEGENDS) {
          count = contract['totalBalance'];
        }
      });
      return count;
    } catch (e) {
      console.error(e);
    }
  }

  async getNftDataFromAlchemy(address: string): Promise<[number[], object]> {
    const result = {};
    const tokenIds = [];
    const countNFT = await this.getCountML(address);
    const nbLoop = Math.ceil(countNFT / 100);
    let pageKey = '';
    for (let i = 1; i <= nbLoop; i++) {
      const res = await this.alchemyService.getNFTsByWallet(address, pageKey);
      if ('pageKey' in res) {
        pageKey = res.pageKey;
      }
      res.ownedNfts.map((item) => {
        const object = {};
        const tokenId = parseInt(item.id.tokenId, 16);
        object['purchasedOn'] = null;
        object['media'] = item.media[0];
        object['tokenId'] = tokenId;
        tokenIds.push(tokenId);
        result[tokenId] = object;
      });
    }
    return [tokenIds, result];
  }

  async getNftDataFromEtherscan(address: string): Promise<object> {
    const data = {};
    const tokenIds = [];
    const res = await this.etherscanService.getNFTsByWallet(
      address,
      CONTRACT_META_LEGENDS,
    );
    res.result.map((item) => {
      tokenIds.push(item.tokenID);
      if (data[item.tokenID] == undefined) {
        data[item.tokenID] = [];
      }
      data[item.tokenID].push(item);
    });
    return data;
  }

  async getNfts(address: string) {
    let nftFromBdd = await this.legendRepository.findBy({ address });
    const [tokenIds, nftFromAlchemy] = await this.getNftDataFromAlchemy(
      address,
    );
    nftFromBdd = await this.process(address, tokenIds, nftFromBdd);
    return this.format(nftFromBdd, nftFromAlchemy);
  }

  async getNftsFromBdd(address: string) {
    return await this.legendRepository.findBy({ address });
  }

  async process(
    address: string,
    tokenIds: number[],
    nftFromBdd: Legend[],
  ): Promise<Legend[]> {
    const [toAdd, toRemove] = this.defineUpdate(tokenIds, nftFromBdd);
    let nftFromEtherscan: object = [];
    if (toAdd.length > 0) {
      nftFromEtherscan = await this.getNftDataFromEtherscan(address);
      const newLegends = this.handleAdd(address, nftFromEtherscan, toAdd);
      nftFromBdd.push(...newLegends);
    }
    if (toRemove.length > 0) {
      nftFromBdd = this.handleRemove(address, nftFromBdd, toRemove);
    }
    return nftFromBdd;
  }

  handleRemove(address: string, nftFromBdd: Legend[], toRemove: Legend[]) {
    const nb = toRemove.length;
    if (nb == 0) {
      return;
    }
    try {
      this.legendRepository.remove(toRemove);
      console.log(`Remove ${nb} legend(s) to wallet ${address}`);
    } catch (error) {
      console.log(error);
    }

    return nftFromBdd.filter(
      (itemFromBdd) =>
        !toRemove.some(
          (itemToRemove) => itemToRemove.tokenId === itemFromBdd.tokenId,
        ),
    );
  }

  extractRecentlyTx(address: string, tokenTransactions: object[]): object {
    if (tokenTransactions.length === 1) {
      return tokenTransactions[0];
    }

    let maxTimeStamp = 0;
    let txSelected = null;
    tokenTransactions.map((tx) => {
      if (tx['to'].toLowerCase() !== address) {
        return;
      }

      if (tx['timeStamp'] > maxTimeStamp) {
        txSelected = tx;
        maxTimeStamp = tx['timeStamp'];
      }
    });
    return txSelected;
  }

  handleAdd(
    address: string,
    nftFromEtherscan: object,
    toAdd: number[],
  ): Legend[] | null {
    if (toAdd.length == 0) {
      return [];
    }
    const newLegends: Legend[] = [];
    toAdd.map((tokenId) => {
      const transaction = this.extractRecentlyTx(
        address,
        nftFromEtherscan[tokenId],
      );

      const timestamp = transaction['timeStamp'];
      const purchasedOn = moment(timestamp * 1000).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      const legend = new Legend();
      legend.address = address;
      legend.tokenId = tokenId;
      legend.purchasedOn = purchasedOn;
      legend.progress = true;
      try {
        this.legendRepository.insert(legend);
        console.log(
          `Insert new legend token id ${tokenId} to wallet ${address} purchased on ${purchasedOn}`,
        );
        newLegends.push(legend);
      } catch (error) {
        console.log(error);
      }
    });

    return newLegends;
  }

  defineUpdate(tokenIds: number[], nftFromBdd: Legend[]) {
    const toRemove = [];
    let toAdd = [];
    nftFromBdd.map((item) => {
      const index = tokenIds.indexOf(item.tokenId);
      if (index == -1) {
        toRemove.push(item);
        return;
      }
      tokenIds.splice(index, 1);
    });

    toAdd = tokenIds;

    return [toAdd, toRemove];
  }

  format(nftFromBdd: Legend[], nftFromApi: object): object[] {
    const result = [];
    nftFromBdd.map((legend) => {
      const obj = {
        tokenId: legend.tokenId,
        purchasedOn: legend.purchasedOn,
        media: nftFromApi[legend.tokenId].media,
        holdingRewards: this.defineHoldingRewards(
          new Date(legend.purchasedOn),
          new Date(),
        ),
      };
      result.push(obj);
    });
    return result;
  }

  defineHoldingRewards(purchasedOnDate: Date, now: Date): object {
    const months = moment(now.getTime()).diff(
      purchasedOnDate.getTime(),
      'months',
    );

    return {
      [HREWARD_1_CODE]: HREWARD_1_DURATION <= months,
      [HREWARD_3_CODE]: HREWARD_3_DURATION <= months,
      [HREWARD_6_CODE]: HREWARD_6_DURATION <= months,
      [HREWARD_9_CODE]: HREWARD_9_DURATION <= months,
      [HREWARD_12_CODE]: HREWARD_12_DURATION <= months,
      [HREWARD_15_CODE]: HREWARD_15_DURATION <= months,
      [HREWARD_18_CODE]: HREWARD_18_DURATION <= months,
      [HREWARD_21_CODE]: HREWARD_21_DURATION <= months,
      [HREWARD_24_CODE]: HREWARD_24_DURATION <= months,
    };
  }
}
