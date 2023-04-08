import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintPackage } from './mint-package.entity';

@Injectable()
export class MintPackageService {
    constructor(
        @InjectRepository(MintPackage)
        private mintPackageRepository: Repository<MintPackage>,
    ) {}

    getOneByFromMintWallet(mintWallet: string): Promise<MintPackage | null>  {
        return this.mintPackageRepository.findOneBy({ mintWallet });
    }

    setPrimaryWallet(mintWallet: string, primaryWallet: string): Promise<MintPackage | null> {
        return null;
    }

    findByMintWallet(mintWallet: string): Promise<MintPackage[] | null> {
        return this.mintPackageRepository.findBy({mintWallet});
    }

    findByPrimaryWallet(primaryWallet: string): Promise<MintPackage[] | null> {
        return this.mintPackageRepository.findBy({primaryWallet});
    }

    // getMetalCumulate(wallet: string): number {
    //     let mintPackagesByMintWallet = this.findByMintWallet(wallet);
    //     let mintPackagesByPrimaryWallet = this.findByPrimaryWallet(wallet);
    //
    //     return 0;
    // }

    getRewardRatio(mintPackage: MintPackage): number {
        const packagePrice = mintPackage.pricePaidEth / mintPackage.nbTokens;
        if (packagePrice <= 2.5) {
            return
        }
    }
}
