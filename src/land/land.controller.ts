import {
  Controller,
  Get,
  Header,
  Inject,
  Param,
  UseGuards,
  Render,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from '@src/auth/auth.guard';

import { LandService } from '@src/land/land.service';
import { LandMintedService } from '@src/land/land-minted/land-minted.service';
import { Public } from '@src/common/decorators/public.decorator';
import { HtmlResponse } from './html-response.decorator';
import { LANDS_IMG } from '@src/enum/land-image';

@Controller('lands')
export class LandController {
  constructor(
    private landService: LandService,
    private landMintedService: LandMintedService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get()
  async getAll() {
    const cacheName = `land-get-all`;
    const cache = await this.cacheManager.get(cacheName);
    if (cache != null) {
      return cache;
    }
    const lands = await this.landService.findAll();
    const result = await Promise.all(
      lands.map(async (land) => {
        const count = await this.landMintedService.remaining(land);
        return {
          item: land,
          remaining: land.supply - count,
        };
      }),
    );
    await this.cacheManager.set(cacheName, result, 3600000);
    return result;
  }

  @Get('/:tokenId')
  @Render('index')
  async get(@Param('tokenId') tokenId: number) {
    const url =
      'https://metalegends.mypinata.cloud/ipfs/QmQik7GsQyQeCqNtETJY2M5uAA6kNEbxVFrWT5asHdeo1D';
    const uri = {
      celestial: {
        legendary: {
          biome: `${url}/biome/Biome01/`,
          card: `${url}/card/1_celestial/celestial_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome01/`,
          card: `${url}/card/1_celestial/celestial_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome01/`,
          card: `${url}/card/1_celestial/celestial_normal/`,
        },
      },
      burner: {
        legendary: {
          biome: `${url}/biome/Biome02/`,
          card: `${url}/card/2_burner/burner_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome02/`,
          card: `${url}/card/2_burner/burner_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome02/`,
          card: `${url}/card/2_burner/burner_normal/`,
        },
      },
      roboter: {
        legendary: {
          biome: `${url}/biome/Biome03/`,
          card: `${url}/card/3_roboter/roboter_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome03/`,
          card: `${url}/card/3_roboter/roboter_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome03/`,
          card: `${url}/card/3_roboter/roboter_normal/`,
        },
      },
      goldboi: {
        legendary: {
          biome: `${url}/biome/Biome04/`,
          card: `${url}/card/4_goldboi/goldboi_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome04/`,
          card: `${url}/card/4_goldboi/goldboi_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome04/`,
          card: `${url}/card/4_goldboi/goldboi_normal/`,
        },
      },
      'matrix-angel': {
        legendary: {
          biome: `${url}/biome/Biome05/`,
          card: `${url}/card/5_matrix/matrix_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome05/`,
          card: `${url}/card/5_matrix/matrix_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome05/`,
          card: `${url}/card/5_matrix/matrix_normal/`,
        },
      },
      cyber: {
        legendary: {
          biome: `${url}/biome/Biome06/`,
          card: `${url}/card/6_cyber/cyber_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome06/`,
          card: `${url}/card/6_cyber/cyber_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome06/`,
          card: `${url}/card/6_cyber/cyber_normal/`,
        },
      },
      rough: {
        legendary: {
          biome: `${url}/biome/Biome07/`,
          card: `${url}/card/7_rough/rough_legendary/`,
        },
        sacred: {
          biome: `${url}/biome/Biome07/`,
          card: `${url}/card/7_rough/rough_sacred/`,
        },
        normal: {
          biome: `${url}/biome/Biome07/`,
          card: `${url}/card/7_rough/rough_normal/`,
        },
      },
    };
    try {
      const land = await this.landMintedService.getByTokenId(tokenId);
      const imageName = LANDS_IMG[land.land.class][land.land.area];
      const cid = 'QmcqGJwVSeYy4cCBdNccb4Wf2SuTMfw9M7S8Sc3at8gJk4';
      const uriMap = `https://metalegends.mypinata.cloud/ipfs/${cid}/${imageName}`;
      const uriVideoBiome =
        uri[land['land']['class']][land['category']]['biome'] +
        land.landContent.biomeName;
      const uriVideoCard =
        uri[land['land']['class']][land['category']]['card'] +
        land.landContent.cardName;
      return {
        tokenId: tokenId,
        map: uriMap,
        card: uriVideoCard,
        biome: uriVideoBiome,
      };
    } catch (error) {
      throw new NotFoundException('Cannot find land token id ' + tokenId);
    }
  }
}
