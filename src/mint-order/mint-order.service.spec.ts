import { Test, TestingModule } from '@nestjs/testing';
import { MintOrderService } from './mint-order.service';

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
});
