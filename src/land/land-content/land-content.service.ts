import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LandContent } from '@src/land/land-content/land-content.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LandContentService {
  constructor(
    @InjectRepository(LandContent)
    private landContentRepository: Repository<LandContent>,
  ) {}

  async getEmpty() {
    return await this.landContentRepository.find({
      where: { landMinted: null },
    });
  }
}
