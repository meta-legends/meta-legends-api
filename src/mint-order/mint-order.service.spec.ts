import { Test, TestingModule } from '@nestjs/testing';
import { MintOrderService } from './mint-order.service';
import { OgPet } from '@src/eligibility/og-pet/og-pet.entity';
import { User } from '@src/user/user.entity';
import { Asset } from '@src/mint/asset/asset.entity';

describe('MintOrderService', () => {
  let service: MintOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintOrderService],
    }).compile();

    service = module.get<MintOrderService>(MintOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test', () => {
    expect(true).toBeTruthy();
    const ogPet: OgPet = {
      id: 1,
      address: '',
      council: 2,
      honorary: 1,
      guardian: 1,
      judge: 1,
      mint: 2,
      og: 0,
      whale: 1,
    };
    const user: User = {
      id: 1,
      wallet: '0x',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      mintOrders: [],
    };
    const asset: Asset = {
      id: 1,
      name: 'OG Pet',
      code: 'og-pets',
      contract: '',
      supply: 1500,
      isOpen: false,
      openOn: null,
      mintOrders: [],
    };
    const mintOrders = service.build(user, asset, ogPet);
    console.log(mintOrders);
    expect(mintOrders.length).toEqual(8);
  });
});
