import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LandMintedService } from '@src/land/land-minted/land-minted.service';
import { LandContentService as ContentService } from '@src/land/land-content/land-content.service';
import { LandContent } from '@src/land/land-content/land-content.entity';
import { DataSource } from 'typeorm/data-source/DataSource';

// npm run command-nest fill-land-content
@Command({
  name: 'fill-land-content',
  description: 'Put mp4 to lands minted',
})
@Injectable()
export class LandContentService extends CommandRunner {
  private static readonly logger = new Logger(LandContentService.name);

  constructor(
    private landMintedService: LandMintedService,
    private contentService: ContentService,
    private dataSource: DataSource,
  ) {
    super();
  }

  async run() {
    const sortContents = await this.getEmptyContentSort();
    const landsMinted = await this.landMintedService.getAll();
    for (const landMinted of landsMinted) {
      const contentSelect =
        sortContents[landMinted.land.class][landMinted.category].shift();
      contentSelect.landMinted = landMinted;
      await this.dataSource.getRepository(LandContent).save(contentSelect);
    }
  }

  async getEmptyContentSort() {
    const contents = await this.contentService.getEmpty();
    const result = {
      celestial: {
        legendary: [],
        sacred: [],
        normal: [],
      },
      burner: {
        legendary: [],
        sacred: [],
        normal: [],
      },
      roboter: {
        legendary: [],
        sacred: [],
        normal: [],
      },
      goldboi: {
        legendary: [],
        sacred: [],
        normal: [],
      },
      'matrix-angel': {
        legendary: [],
        sacred: [],
        normal: [],
      },
      cyber: {
        legendary: [],
        sacred: [],
        normal: [],
      },
      rough: {
        legendary: [],
        sacred: [],
        normal: [],
      },
    };
    contents.forEach((landContent) => {
      result[landContent.class][landContent.category].push(landContent);
    });
    return result;
  }
}
