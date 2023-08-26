import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { PINATA_URL } from '@src/enum/pinata-uri';
import { HOLDING_REWARD_METADATA } from '@src/enum/holding-reward';
import { writeFileSync } from 'fs';

interface BasicCommandOptions {
  string?: string;
}

@Command({
  name: 'holding-rewards-metadata',
  description: 'Build json metadata (rewardCode, CIDImage, CIDMedia)',
})
@Injectable()
export class MetadataService extends CommandRunner {
  private static readonly logger = new Logger(MetadataService.name);

  constructor() {
    super();
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    MetadataService.logger.log('[Command] MetadataService');

    const startId = passedParam[0];
    const endId = passedParam[1];
    const rewardCode = passedParam[2];
    const cidIpfsImage = passedParam[3];
    const cidIpfsMedia = passedParam[4];

    for (let index = Number(startId); index <= Number(endId); index++) {
      const data = this.generateMetadata(
        index,
        rewardCode,
        cidIpfsImage,
        cidIpfsMedia,
      );
      writeFileSync(
        `./data/holding-reward/${index}.json`,
        JSON.stringify(data, null, 2),
      );
    }
  }

  generateMetadata(
    id: number,
    rewardCode: string,
    cidIpfsImage,
    cidIpfsMedia,
  ): object {
    return {
      name: `Meta-Life Holding Reward #${id}`,
      description:
        'This NFT represents an holding reward whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: this.getPathContent(cidIpfsImage, rewardCode, 'gif'),
      animation_url: this.getPathContent(cidIpfsMedia, rewardCode, 'mp4'),
      attributes: HOLDING_REWARD_METADATA[rewardCode],
    };
  }

  getPathContent(cid: string, rewardCode: string, extension: string): string {
    return `${PINATA_URL}${cid}/${rewardCode}.${extension}`;
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }
}
