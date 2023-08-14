import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Asset } from '../asset/asset.entity';
import { Repository } from 'typeorm';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: getRepositoryToken(Asset),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
