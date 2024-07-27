import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OgPet } from './og-pet.entity';
import { DataSource } from 'typeorm/data-source/DataSource';

@Injectable()
export class OgPetService {
  constructor(
    @InjectRepository(OgPet)
    private eliOgPetRepository: Repository<OgPet>,
    private dataSource: DataSource,
  ) {}

  getEstimateByWallet(address: string): Promise<OgPet | null> {
    return this.eliOgPetRepository.findOneBy({ address });
  }

  getEmptyOgPet(address: string): OgPet {
    return {
      id: null,
      address: address,
      council: 0,
      guardian: 0,
      honorary: 0,
      judge: 0,
      mint: 0,
      og: 0,
      whale: 0,
      user: null,
    };
  }
}
