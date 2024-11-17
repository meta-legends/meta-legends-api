import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Land } from '@src/land/land.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(Land) private landRepository: Repository<Land>,
  ) {}

  async findOneById(id: number): Promise<Land | null> {
    return this.landRepository.findOneBy({ id });
  }

  async findAll(): Promise<Land[]> {
    return this.landRepository.find();
  }
}
