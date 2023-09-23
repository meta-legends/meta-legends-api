import { Injectable, Logger } from '@nestjs/common';
import { AlchemyService, GET_NFTS, NETWORK_ETH } from "@src/client/alchemy/alchemy.service";
import { CONTRACT_WEAPON_SKIN } from '@src/enum/contract';

@Injectable()
export class WeaponSkinService {
  private static readonly logger = new Logger(WeaponSkinService.name);
  constructor(private readonly alchemyService: AlchemyService) {}

  async getNfts(address: string) {
    const params = {
      'contractAddresses[]': CONTRACT_WEAPON_SKIN,
      owner: address,
      withMetadata: true,
    };
    const response = await this.alchemyService.get(GET_NFTS, params, NETWORK_ETH);
    const result = [];
    response.ownedNfts.map((honorary) => {
      if (honorary.title.includes('Meta Life Universal Weapon Skin')) {
        const str = honorary.title.split('#');
        const data = {
          tokenId: parseInt(str[1]),
          image: honorary.media[0].thumbnail,
          name: honorary.title,
        };
        result.push(data);
      }
    });
    return result;
  }
}
