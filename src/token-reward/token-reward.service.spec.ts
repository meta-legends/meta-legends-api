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
  TokenRewardService,
} from './token-reward.service';
import { MintPackage } from '../mint-package/mint-package.entity';

describe('TokenRewardService', () => {
  let service: TokenRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenRewardService],
    }).compile();

    service = module.get<TokenRewardService>(TokenRewardService);
  });

  it('should be estimated days between 2 dates', () => {
    const startDate = new Date('2022-01-01 20:00:00');
    const endDate = new Date('2022-01-07 15:00:00');
    expect(service.getDaysBetweenDates(startDate, endDate)).toEqual(6);
  });

  it('should get ratio empty for none package', () => {
    expect(service.getRewardRatios(0.3)).toEqual([]);
  });
  it('should get ratio armor for package', () => {
    const expectArmor = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
    ];
    expect(service.getRewardRatios(0.5)).toEqual(expectArmor);
    expect(service.getRewardRatios(0.6)).toEqual(expectArmor);
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
    expect(service.getRewardRatios(1)).toEqual(expectPet);
    expect(service.getRewardRatios(1.3)).toEqual(expectPet);
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
    expect(service.getRewardRatios(1.5)).toEqual(expectVehicle);
    expect(service.getRewardRatios(1.9)).toEqual(expectVehicle);
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
    expect(service.getRewardRatios(2.1)).toEqual(expectVehicle);
  });
  it('should get ratio land for package', () => {
    const expectLand = REWARD_RATIOS;
    expect(service.getRewardRatios(2.5)).toEqual(expectLand);
    expect(service.getRewardRatios(2.9)).toEqual(expectLand);
    expect(service.getRewardRatios(3)).toEqual(expectLand);
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
    expect(service.estimate(mintPackage, new Date('2022-01-01'))).toEqual(0);
  });
  it('should estimate token rewards by package', () => {
    const mintArmorPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 0.5,
      pricePaidEth: 0.5,
      mintAt: '2021-12-25',
      tokens: '',
      nbTokens: 1,
    };

    // armor package: days 7
    expect(service.estimate(mintArmorPackage, new Date('2022-01-01'))).toEqual(
      1.47,
    );
    // armor package: days 39
    mintArmorPackage.pricePaidEth = 0.9;
    expect(service.estimate(mintArmorPackage, new Date('2022-02-02'))).toEqual(
      8.19,
    );

    const mintLandPackage: MintPackage = {
      id: 1,
      mintWallet: '',
      priceOfSaleEth: 3,
      pricePaidEth: 6,
      mintAt: '2021-11-25',
      tokens: '',
      nbTokens: 2,
    };

    // land package: days 468
    expect(service.estimate(mintLandPackage, new Date('2023-04-07'))).toEqual(
      13137.24,
    );
  });

  it('should get REWARD RATIO by perk label', () => {
    const expectedArmor = [
      {
        perk_label: PERK_LABEL_ARMOR,
        perk_ratio: PERK_RATIO_REWARD_ARMOR,
      },
    ];
    expect(service.getRewardRatiosByPerkLabel(PERK_LABEL_ARMOR)).toEqual(
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
    expect(service.getRewardRatiosByPerkLabel(PERK_LABEL_LAND)).toEqual(
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
    expect(service.getRewardRatiosByPerkLabel(PERK_LABEL_PET)).toEqual(
      expectedPet,
    );

    expect(service.getRewardRatiosByPerkLabel('unknown')).toEqual([]);
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
    expect(service.getPerkPackages([mintPackage], new Date())).toEqual(
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
      [PERK_LABEL_ARMOR]: { quantity: 1, tokens: 104.58 },
      [PERK_LABEL_PET]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_VEHICLE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_RESIDENCE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_LAND]: { quantity: 0, tokens: 0 },
    };
    expect(
      service.getPerkPackages([mintPackage], new Date('2023-04-07')),
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
      [PERK_LABEL_ARMOR]: { quantity: 2, tokens: 209.16 },
      [PERK_LABEL_PET]: { quantity: 2, tokens: 816.72 },
      [PERK_LABEL_VEHICLE]: { quantity: 2, tokens: 1633.44 },
      [PERK_LABEL_RESIDENCE]: { quantity: 2, tokens: 3067.68 },
      [PERK_LABEL_LAND]: { quantity: 2, tokens: 7410.24 },
    };
    expect(
      service.getPerkPackages([mintPackage], new Date('2023-04-07')),
    ).toEqual(expected);
  });
});
