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

    const result = {};
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
}
