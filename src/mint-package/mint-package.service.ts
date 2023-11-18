import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, MoreThanOrEqual, Repository } from 'typeorm';
import { MintPackage } from './mint-package.entity';
import { MintPackageUpdateDto } from './mint-package-update.dto';
import { DataSource } from 'typeorm/data-source/DataSource';

@Injectable()
export class MintPackageService {
  constructor(
    @InjectRepository(MintPackage)
    private mintPackageRepository: Repository<MintPackage>,
    private dataSource: DataSource,
  ) {}

  getByMintWallet(mintWallet: string): Promise<MintPackage[] | null> {
    return this.mintPackageRepository.findBy({ mintWallet });
  }

  findOneById(id: number): Promise<MintPackage | null> {
    return this.mintPackageRepository.findOneBy({ id });
  }

  async update(
    mintPackage: MintPackage,
    mintPackageUpdateDto: MintPackageUpdateDto,
  ): Promise<MintPackage> {
    const updatedMintPackage = Object.assign(mintPackage, mintPackageUpdateDto);

    return this.mintPackageRepository.save(updatedMintPackage);
  }

  async getListPerkVehicle() {
    const mintPackages = await this.mintPackageRepository
      .createQueryBuilder('mintPackage')
      .where('pricePaidEth >= nbTokens * 1.5')
      .execute();

    const result = this.getOGs();
    console.log(`nb mintPackages ${mintPackages.length}`);
    mintPackages.forEach((mintPackage) => {
      const wallet = mintPackage.mintPackage_mintWallet;
      const nbTokens = mintPackage.mintPackage_nbTokens;
      if (!Object.keys(result).includes(wallet)) {
        result[wallet] = nbTokens;
      } else {
        result[wallet] += nbTokens;
      }
    });
    return result;
  }

  getOGs() {
    return {
      '0x0258ca807b6473358ba5fcc9410fe1aa5b777ac2': 1,
      '0x050d0ff553747cf65c606524777afff62b250e71': 1,
      '0x08614c9b771d5e7bc44226617bb6b637e546811d': 1,
      '0x08cd03e4fda1a599ec6da5c3e6dd989cfc5f5d39': 1,
      '0x0d99e06ac0067853dd10c569e00e922d6c58cc7d': 1,
      '0x1084b2f62d932053df16b1dac9b9ec396e5ebccb': 1,
      '0x1370d0d188dc1b59e894a6333c0fc2e52081fce3': 1,
      '0x23db8ddb062a0984935cf17247e992089e115b3d': 1,
      '0x2514bd6f73664e4ef202e66186345a138be957ec': 1,
      '0x265c81262fb186f2471ca18b85866edb8d3fe7da': 1,
      '0x2cdbfcba1f07c448395cbfd7fe0e6d564024d753': 1,
      '0x2ff6c25e751812e9445948f7b376c7691ed0aea9': 1,
      '0x333fd9bb3f66c4238a7a864f8bc4180fc2f2e638': 1,
      '0x34357dc6be6a22ae49474596eca31ce56284266f': 1,
      '0x36cd5fc01c2e86a02e9d814ca22bed784edd9e7b': 1,
      '0x3ac191700ab6cef7fa14cecd3724c3145a226621': 2,
      '0x3dafdab491d60443e91ab081dee4ed8fe782463f': 1,
      '0x3dcc72e2c811bf78c76f2ddc77ccf8b928bc7e51': 1,
      '0x42afead40916fe8a7ca80ffbf41f070063c0854b': 1,
      '0x43ce2b9a3a7f4c0d60e1639ba7ca679aa079358e': 1,
      '0x476994fe455ef2af214d068f78817a76c69a0288': 1,
      '0x4903377090c364bfd877df604e0d09e436267f31': 1,
      '0x51cbb268d74204ff2c62d1a5c7961f9bc2b7b3fd': 1,
      '0x53c4667e080c11cd83b2880b3cbbdcea56320840': 1,
      '0x581b3dd5220e42b18301f73d04f393b469b9d551': 1,
      '0x60e67d916eed437d5939e0f962ee7f12a2257494': 1,
      '0x620dd3ccd9231cd895836e01dd6e99dfd85a8652': 1,
      '0x6317e1f1d127c2163670a1006c2cd203e2cf77d0': 1,
      '0x63a9235e8d2f043edcbcff2ea1e7bb88a17dbf2b': 1,
      '0x68f5db96a72bc25276613027b25112d2f49456b4': 1,
      '0x75601d31c7203ad90d9a25ecd6ad38bab6f69bf6': 1,
      '0x7acd33ac0bb99546ac861bff0f89e3602d81870d': 1,
      '0x7e06447445aeab6ece095481a722cd8f5a0c3c4c': 1,
      '0x852dfa09e986bdc6a96ce47b024caad1daedc5e0': 1,
      '0x86495928a671f5aeccde40d31c1efeaa388ed62c': 1,
      '0x86ea7258705cb00a5662890655467ab3f2fed323': 1,
      '0x89cf8f24ae69f7103a181e74c1770c96e51bd978': 1,
      '0x8c00605886e9edd6304fe99f4c265425d4f333af': 1,
      '0x8d1dd9af5d4588b83b7a8997a5852f580861c23f': 1,
      '0x931272762e7eeff1c559e0b8b480dfd5d9c820a1': 1,
      '0x9649a28f7fcf5b672dcc780d84a09c52378969d6': 1,
      '0x972a2b2651c811834cd1d19a9506d876b87d4120': 1,
      '0x99cf4f2a51021859f7dadb1c026c41e2ce91b9f9': 1,
      '0xaab277f9b256306a3fb738c3de87337a9f6f2c76': 1,
      '0xaf1678d515f1fc473d87c3a48eb9458fb31421f2': 1,
      '0xb39ec4843d0f6f67f79c7945779722f9698fe8f1': 1,
      '0xb9373cc1dac6860861dd14a1d01aecdee719ad2d': 1,
      '0xb94171240f688394c529367c91f915e52ed8b3bd': 1,
      '0xc024d1517324288550c4a15309ad33983dd50273': 1,
      '0xc1568f920ca1a95bf9f13b8bc82f0fd93a89b9ba': 1,
      '0xc753dc724315d780c21092839474035b9cd28a54': 1,
      '0xd036a6ca5a77923d14dd23b345cb0bb16980763a': 1,
      '0xded3ac663b2352714d3b7dd7efc69d4089fc6f62': 1,
      '0xed8e848fdac3658342ef88147684c3e0cbc8ae00': 1,
      '0xf2d8dd7387978555315ec21d55834ea04f4aab5b': 1,
      '0xf5b4da097652883709597cc695edf79a679bff0f': 1,
      '0xfc30085ad17d7340dd73bacefb8d9f8c6b0f307f': 1,
      '0x71a094175ba3f5d638510e2d6fccaaa9f30b18f0': 1,
    };
  }
}
