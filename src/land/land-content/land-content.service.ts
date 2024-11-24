import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LandContent } from '@src/land/land-content/land-content.entity';
import { Repository } from 'typeorm';
import {LandMinted} from "@src/land/land-minted/land-minted.entity";

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

  async findOneEmptyByClassAndCategory(
    className: string,
    category: string,
  ): Promise<LandContent | null> {
    return await this.landContentRepository.findOne({
      where: {
        landMinted: null,
        class: className,
        category: category,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async link(landMinted: LandMinted): Promise<LandContent> {
    const content = await this.findOneEmptyByClassAndCategory(
      landMinted.land.class,
      landMinted.category,
    );
    content.landMinted = landMinted;
    return await this.landContentRepository.save(content);
  }
}
