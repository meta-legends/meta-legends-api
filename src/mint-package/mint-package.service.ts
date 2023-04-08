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

    getByFromMintWallet(mintWallet: string): Promise<MintPackage[] | null>  {
        return this.mintPackageRepository.findBy({ mintWallet });
    }
}
