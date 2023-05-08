import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegendService } from './legend.service';
import { EtherscanService } from '../../client/etherscan/etherscan.service';
import { AlchemyService } from '../../client/alchemy/alchemy.service';

import { Legend } from './legend.entity';

describe('LegendService', () => {
  let legendService: LegendService;
  let etherscanService: EtherscanService;
  let alchemyService: AlchemyService;
  let legendRepository: Repository<Legend>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LegendService,
        {
          provide: getRepositoryToken(Legend),
          useClass: Repository,
        },
        {
          provide: EtherscanService,
          useValue: {
            // Mock EtherscanService methods as needed
          },
        },
        {
          provide: AlchemyService,
          useValue: {
            // Mock AlchemyService methods as needed
          },
        },
      ],
    }).compile();

    legendService = module.get<LegendService>(LegendService);
    etherscanService = module.get<EtherscanService>(EtherscanService);
    alchemyService = module.get<AlchemyService>(AlchemyService);
    legendRepository = module.get<Repository<Legend>>(
      getRepositoryToken(Legend),
    );
  });

  it('should be defined', () => {
    expect(legendService).toBeDefined();
  });

  it('should be check tokenIds and token from bdd equal', () => {
    const tokenIds = [1, 3, 5];
    const nftFromBdd = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 1,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 5,
      },
    ];
    expect(legendService.defineUpdate(tokenIds, nftFromBdd)).toEqual([[], []]);
  });

  it('should be check holder have a new nft but sold one', () => {
    const tokenIds = [1, 3, 5];
    const nftFromBdd = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 1,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 6,
      },
    ];
    expect(legendService.defineUpdate(tokenIds, nftFromBdd)).toEqual([
      [5],
      [
        {
          id: 237,
          address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
          progress: true,
          purchasedOn: '2022-04-03T00:47:17.000Z',
          tokenId: 6,
        },
      ],
    ]);
  });

  it('should be check holder have new nfts', () => {
    const tokenIds = [1, 3, 5];
    const nftFromBdd = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 1,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
    ];
    expect(legendService.defineUpdate(tokenIds, nftFromBdd)).toEqual([[5], []]);
  });

  it('should be check holder have sold NFT', () => {
    const tokenIds = [1];
    const nftFromBdd = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 1,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 6,
      },
    ];

    const toRemove = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 6,
      },
    ];
    expect(legendService.defineUpdate(tokenIds, nftFromBdd)).toEqual([
      [],
      toRemove,
    ]);
  });

  it('should be check holder have a new nft but sold one', () => {
    const tokenIds = [1, 3, 6, 100, 1229];
    const nftFromBdd = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 1,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 3,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 65,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 66,
      },
    ];

    const toRemove = [
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 65,
      },
      {
        id: 237,
        address: '0x24df9f5a2624db695ee695399fd43deb62c475bd',
        progress: true,
        purchasedOn: '2022-04-03T00:47:17.000Z',
        tokenId: 66,
      },
    ];
    expect(legendService.defineUpdate(tokenIds, nftFromBdd)).toEqual([
      [6, 100, 1229],
      toRemove,
    ]);
  });
});
