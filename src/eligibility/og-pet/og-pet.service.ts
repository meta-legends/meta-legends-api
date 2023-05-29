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

  findAll(): Promise<OgPet[] | null> {
    return this.dataSource.getRepository(OgPet).find({
      relations: { user: true },
    });
  }

  findOne(address: string): Promise<OgPet | null> {
    return this.dataSource.getRepository(OgPet).findOne({
      where: { address: address },
      relations: { user: true },
    });
  }
}
