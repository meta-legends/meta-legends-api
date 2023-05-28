import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OgPet } from './og-pet.entity';

@Injectable()
export class OgPetService {
  constructor(
    @InjectRepository(OgPet)
    private eliOgPetRepository: Repository<OgPet>,
  ) {}

  getEstimateByWallet(address: string): Promise<OgPet | null> {
    return this.eliOgPetRepository.findOneBy({ address });
  }

  findAll(): Promise<OgPet[] | null> {
    return this.eliOgPetRepository.find();
  }
}
