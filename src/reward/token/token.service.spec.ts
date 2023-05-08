import { Test, TestingModule } from '@nestjs/testing';
import {
  PERK_LABEL_ARMOR,
  PERK_LABEL_LAND,
  PERK_LABEL_PET,
  PERK_LABEL_RESIDENCE,
  PERK_LABEL_VEHICLE,
  PERK_RATIO_REWARD_ARMOR,
  PERK_RATIO_REWARD_LAND,
  PERK_RATIO_REWARD_PET,
  PERK_RATIO_REWARD_RESIDENCE,
  PERK_RATIO_REWARD_VEHICLE,
  REWARD_RATIOS,
  TokenService,
} from './token.service';
import { MintPackage } from '../../mint-package/mint-package.entity';
import { DatetimeService } from '../../utils/datetime/datetime.service';

describe('TokenService', () => {
  let tokenService: TokenService;
  let datetimeService: DatetimeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: DatetimeService,
          useValue: {
            getDaysBetweenDates: jest
              .fn()
              .mockReturnValueOnce(39)
              .mockReturnValueOnce(7)
              .mockReturnValueOnce(498),
          },
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
    datetimeService = module.get<DatetimeService>(DatetimeService);
  });

  it('should get ratio empty for none package', () => {
    expect(tokenService.getRewardRatios(0.3)).toEqual([]);
  });
  it('should get ratio armor for package', () => {
    const expectArmor = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
    ];
    expect(tokenService.getRewardRatios(0.5)).toEqual(expectArmor);
    expect(tokenService.getRewardRatios(0.6)).toEqual(expectArmor);
  });
  it('should get ratio pets for package', () => {
    const expectPet = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
      {
        perk_label: PERK_LABEL_PET,
        perk_ratio: PERK_RATIO_REWARD_PET,
      },
    ];
    expect(tokenService.getRewardRatios(1)).toEqual(expectPet);
    expect(tokenService.getRewardRatios(1.3)).toEqual(expectPet);
  });
  it('should get ratio vehicle for package', () => {
    const expectVehicle = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
      {
        perk_label: PERK_LABEL_PET,
        perk_ratio: PERK_RATIO_REWARD_PET,
      },
      {
        perk_label: PERK_LABEL_VEHICLE,
        perk_ratio: PERK_RATIO_REWARD_VEHICLE,
      },
    ];
    expect(tokenService.getRewardRatios(1.5)).toEqual(expectVehicle);
    expect(tokenService.getRewardRatios(1.9)).toEqual(expectVehicle);
  });
  it('should get ratio residence for package', () => {
    const expectVehicle = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
      {
        perk_label: PERK_LABEL_PET,
        perk_ratio: PERK_RATIO_REWARD_PET,
      },
      {
        perk_label: PERK_LABEL_VEHICLE,
        perk_ratio: PERK_RATIO_REWARD_VEHICLE,
      },
      {
        perk_label: PERK_LABEL_RESIDENCE,
        perk_ratio: PERK_RATIO_REWARD_RESIDENCE,
      },
    ];
    expect(tokenService.getRewardRatios(2.1)).toEqual(expectVehicle);
  });
  it('should get ratio land for package', () => {
    const expectLand = REWARD_RATIOS;
    expect(tokenService.getRewardRatios(2.5)).toEqual(expectLand);
    expect(tokenService.getRewardRatios(2.9)).toEqual(expectLand);
    expect(tokenService.getRewardRatios(3)).toEqual(expectLand);
  });

  it('should estimate token rewards by none package', () => {
    const mintPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 0.3,
      pricePaidEth: 0.3,
      mintAt: '2021-12-25',
      tokens: '',
      nbTokens: 1,
    };
    // 7 days
    expect(tokenService.estimate(mintPackage, new Date('2022-01-01'))).toEqual(
      0,
    );
  });
  it('should estimate token rewards by package', () => {
    const mintArmorPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 0.9,
      pricePaidEth: 0.9,
      mintAt: '2021-12-25',
      tokens: '',
      nbTokens: 1,
    };
    // armor package: days 39
    expect(
      tokenService.estimate(mintArmorPackage, new Date('2022-02-02')),
    ).toEqual(8.19);

    // armor package: days 7
    mintArmorPackage.pricePaidEth = 0.5;
    expect(
      tokenService.estimate(mintArmorPackage, new Date('2022-01-02')),
    ).toEqual(1.47);


    const mintLandPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 3,
      pricePaidEth: 6,
      mintAt: '2021-11-25',
      tokens: '',
      nbTokens: 2,
    };

    // land package: days 498
    expect(
      tokenService.estimate(mintLandPackage, new Date('2023-04-07')),
    ).toEqual(13137.24);
  });

  it('should get REWARD RATIO by perk label', () => {
    const expectedArmor = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
    ];
    expect(tokenService.getRewardRatiosByPerkLabel(PERK_LABEL_ARMOR)).toEqual(
      expectedArmor,
    );

    const expectedLand = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
      {
        perk_label: PERK_LABEL_PET,
        perk_ratio: PERK_RATIO_REWARD_PET,
      },
      {
        perk_label: PERK_LABEL_VEHICLE,
        perk_ratio: PERK_RATIO_REWARD_VEHICLE,
      },
      {
        perk_label: PERK_LABEL_RESIDENCE,
        perk_ratio: PERK_RATIO_REWARD_RESIDENCE,
      },
      {
        perk_label: PERK_LABEL_LAND,
        perk_ratio: PERK_RATIO_REWARD_LAND,
      },
    ];
    expect(tokenService.getRewardRatiosByPerkLabel(PERK_LABEL_LAND)).toEqual(
      expectedLand,
    );

    const expectedPet = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
      {
        perk_label: PERK_LABEL_PET,
        perk_ratio: PERK_RATIO_REWARD_PET,
      },
    ];
    expect(tokenService.getRewardRatiosByPerkLabel(PERK_LABEL_PET)).toEqual(
      expectedPet,
    );

    expect(tokenService.getRewardRatiosByPerkLabel('unknown')).toEqual([]);
  });

  it('should estimate token rewards by no perk', () => {
    const mintPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 0.3,
      pricePaidEth: 0.3,
      mintAt: '2021-11-25',
      tokens: '',
      nbTokens: 1,
    };
    const expected = {
      [PERK_LABEL_ARMOR]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_PET]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_VEHICLE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_RESIDENCE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_LAND]: { quantity: 0, tokens: 0 },
    };
    expect(tokenService.getPerkPackages([mintPackage], new Date())).toEqual(
      expected,
    );
  });
  it('should estimate armor perk', () => {
    const mintPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 0.5,
      pricePaidEth: 0.5,
      mintAt: '2021-11-25',
      tokens: '',
      nbTokens: 1,
    };
    const expected = {
      [PERK_LABEL_ARMOR]: { quantity: 1, tokens: 8.19 },
      [PERK_LABEL_PET]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_VEHICLE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_RESIDENCE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_LAND]: { quantity: 0, tokens: 0 },
    };
    expect(
      tokenService.getPerkPackages([mintPackage], new Date('2022-02-02')),
    ).toEqual(expected);
  });

  it('should estimate land perk', () => {
    const mintPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 3,
      pricePaidEth: 6,
      mintAt: '2021-11-25',
      tokens: '',
      nbTokens: 2,
    };
    const expected = {
      [PERK_LABEL_ARMOR]: { quantity: 2, tokens: 16.38 },
      [PERK_LABEL_PET]: { quantity: 2, tokens: 63.96 },
      [PERK_LABEL_VEHICLE]: { quantity: 2, tokens: 127.92 },
      [PERK_LABEL_RESIDENCE]: { quantity: 2, tokens: 240.24 },
      [PERK_LABEL_LAND]: { quantity: 2, tokens: 580.32 },
    };
    expect(
      tokenService.getPerkPackages([mintPackage], new Date('2022-02-02')),
    ).toEqual(expected);
  });
});
