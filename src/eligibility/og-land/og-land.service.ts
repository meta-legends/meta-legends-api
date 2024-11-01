import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OgLand } from '@src/eligibility/og-land/og-land.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OgLandService {
  constructor(
    @InjectRepository(OgLand) private landRepository: Repository<OgLand>,
  ) {}

  async findOneById(id: number): Promise<OgLand | null> {
    return this.landRepository.findOneBy({ id });
  }

  async findAll(): Promise<OgLand[]> {
    return this.landRepository.find();
  }
}
