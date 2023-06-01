import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Legend } from './legend.entity';
import { EtherscanService } from '../client/etherscan/etherscan.service';
import { AlchemyService } from '../client/alchemy/alchemy.service';
import { CONTRACT_META_LEGENDS } from '@src/enum/contract';

export const PERK_LABEL_CYBER_WEAPON = 'cyberWeapon';
export const PERK_LABEL_CYBER_ARMOR = 'cyberArmor';
export const PERK_LABEL_ROUGH_PETS = 'roughPet';
export const PERK_LABEL_ROBOTER_WEAPON = 'roboterWeapon';
export const PERK_LABEL_MATRIX_ANGEL_VEHICLE = 'matrixAngelVehicle';
export const PERK_LABEL_HEALING_DRONE = 'healingDrone';

export const MINPERIOD_HOLD_CYBER_WEAPON = 1;
export const MINPERIOD_HOLD_CYBER_ARMOR = 2;
export const MINPERIOD_HOLD_ROUGH_PETS = 5;
export const MINPERIOD_HOLD_ROBOTER_WEAPON = 8;
export const MINPERIOD_HOLD_MA_VEHICLE = 11;
export const MINPERIOD_HOLD_HEALING_DRONE = 15;

@Injectable()
export class LegendService {
  constructor(
    @InjectRepository(Legend) private legendRepository: Repository<Legend>,
    private readonly etherscanService: EtherscanService,
    private readonly alchemyService: AlchemyService,
  ) {}

  async getNftDataFromAlchemy(address: string): Promise<[number[], object]> {
    const res = await this.alchemyService.getNFTsByWallet(address);
    const result = [];
    const tokenIds = [];
    res.ownedNfts.map((item) => {
      const object = {};
      const tokenId = parseInt(item.id.tokenId, 16);
      object['purchasedOn'] = null;
      object['media'] = item.media[0];
      object['tokenId'] = tokenId;
      tokenIds.push(tokenId);
      result[tokenId] = object;
    });
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
      if (nftFromEtherscan[tokenId].length > 1) {
        // Todo : handle case if etherscan send multiple data by token id
        console.log(
          `handle case if etherscan send multiple data at token id ${tokenId} and wallet ${address}`,
        );
        return;
      }

      const timestamp = nftFromEtherscan[tokenId][0]['timeStamp'];
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
      [PERK_LABEL_CYBER_WEAPON]: MINPERIOD_HOLD_CYBER_WEAPON <= months,
      [PERK_LABEL_CYBER_ARMOR]: MINPERIOD_HOLD_CYBER_ARMOR <= months,
      [PERK_LABEL_ROUGH_PETS]: MINPERIOD_HOLD_ROUGH_PETS <= months,
      [PERK_LABEL_ROBOTER_WEAPON]: MINPERIOD_HOLD_ROBOTER_WEAPON <= months,
      [PERK_LABEL_MATRIX_ANGEL_VEHICLE]: MINPERIOD_HOLD_MA_VEHICLE <= months,
      [PERK_LABEL_HEALING_DRONE]: MINPERIOD_HOLD_HEALING_DRONE <= months,
    };
  }
}
