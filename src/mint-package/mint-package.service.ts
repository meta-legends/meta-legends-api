import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintPackage } from './mint-package.entity';
import { MintPackageUpdateDto } from './mint-package-update.dto';

@Injectable()
export class MintPackageService {
    constructor(
        @InjectRepository(MintPackage)
        private mintPackageRepository: Repository<MintPackage>,
    ) {}

    getByMintWallet(mintWallet: string): Promise<MintPackage[] | null>  {
        return this.mintPackageRepository.findBy({ mintWallet });
    }

    findOneById(id: number): Promise<MintPackage | null> {
        return this.mintPackageRepository.findOneBy({id});
    }

    async update(mintPackage: MintPackage, mintPackageUpdateDto: MintPackageUpdateDto): Promise<MintPackage> {

        const updatedMintPackage = Object.assign(mintPackage, mintPackageUpdateDto);

        return this.mintPackageRepository.save(updatedMintPackage);
    }
}
