import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm/data-source/DataSource';
import { Repository } from 'typeorm';

import { OgPet } from '@src/eligibility/og-pet/og-pet.entity';
import { Asset } from '@src/asset/asset.entity';
import { MintOrder } from '@src/mint-order/mint-order.entity';
import { User } from '@src/user/user.entity';

import {
  ELIGIBILITY_COUNCIL,
  ELIGIBILITY_GUARDIAN,
  ELIGIBILITY_HONORARY,
  ELIGIBILITY_JUDGE,
  ELIGIBILITY_MINT,
  ELIGIBILITY_OG,
  ELIGIBILITY_WHALE,
  OG_PET_TYPES,
} from '../enum/eligibility-mint-og-pet';
import { InjectRepository } from '@nestjs/typeorm';
import { MintOrderPositionUpdateDto } from '@src/mint-order/mint-order-position-update.dto';

@Injectable()
export class MintOrderService {
  constructor(
    @InjectRepository(MintOrder)
    private mintOrderRepository: Repository<MintOrder>,
    private dataSource: DataSource,
  ) {}

  build(user: User, asset: Asset, ogPet: OgPet) {
    const quantities = this.getQuantities(ogPet);
    const mintOrders = [];
    let position = 0;
    OG_PET_TYPES.forEach((type) => {
      if (quantities[type] == 0) {
        return;
      }
      for (let index = 1; index <= quantities[type]; index++) {
        const mintOrder: MintOrder = {
          id: null,
          asset: asset,
          user: user,
          position: position,
          choice: type,
          minted: false,
          updatedAt: new Date().toISOString(),
          mintedAt: null,
          mintMonitoring: null,
          mint: null,
        };
        position++;
        mintOrders.push(mintOrder);
      }
    });

    return mintOrders;
  }

  getQuantities(ogPet: OgPet) {
    return {
      [ELIGIBILITY_MINT]: ogPet.mint,
      [ELIGIBILITY_OG]: ogPet.og,
      [ELIGIBILITY_GUARDIAN]: ogPet.guardian,
      [ELIGIBILITY_JUDGE]: ogPet.judge,
      [ELIGIBILITY_COUNCIL]: ogPet.council,
      [ELIGIBILITY_WHALE]: ogPet.whale,
      [ELIGIBILITY_HONORARY]: ogPet.honorary,
    };
  }

  /**
   * Useless but must recode to be generic
   * @param asset
   * @param ogPet
   */
  async create(asset: Asset, ogPet: OgPet): Promise<number> {
    const mintOrders = this.build(ogPet.user, asset, ogPet);
    if (mintOrders.length == 0) {
      return 0;
    }
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(MintOrder)
      .values(mintOrders)
      .execute();
    return mintOrders.length;
  }

  async findByUserAndAsset(
    user: User,
    asset: Asset,
  ): Promise<MintOrder[] | null> {
    return this.mintOrderRepository.find({
      where: { user: user, asset: asset },
      order: { position: 'ASC' },
    });
  }

  async findOneById(id: number): Promise<MintOrder | null> {
    return this.mintOrderRepository.findOneBy({ id });
  }

  async updatePosition(
    mintOrders: MintOrder[],
    mintOrderPositionUpdateDtos: MintOrderPositionUpdateDto[],
  ): Promise<MintOrder[]> {
    let position = 0;
    const mintOrdersUpdated = [];
    for await (const mintOrderPositionUpdateDto of mintOrderPositionUpdateDtos) {
      mintOrders.forEach((mintOrder) => {
        if (mintOrderPositionUpdateDto.id == mintOrder.id) {
          mintOrderPositionUpdateDto.position = position;
          const updateMintOrder = Object.assign(
            mintOrder,
            mintOrderPositionUpdateDto,
          );
          this.mintOrderRepository.save(updateMintOrder);
          mintOrdersUpdated.push(updateMintOrder);
          position++;
        }
      });
    }
    return mintOrdersUpdated;
  }
}
