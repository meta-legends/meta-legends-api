import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { PINATA_URL } from '@src/enum/pinata-uri';
import {
  HOLDING_REWARD_METADATA,
  HOLDING_REWARDS_KEY_VALUE,
} from '@src/enum/holding-reward';
import { writeFileSync } from 'fs';

interface BasicCommandOptions {
  string?: string;
}
// cyber-weapon: 15000,
// cyber-armo: 15000,
// rough-pet: 15000,
// roboter-weapon: 15000,
// matrix-angel-car: 15000,
// healing-drone: 12000,
// ml-network-pass: 12000,
// particles-cosmetic-effect: 12000,
// shadow-gem: 8000
// npm run command-nest holding-rewards-metadata cyber-weapon QmWpskk3QApuTEHG7fUKhV1AcvrCwjkLf6xSxuJnavp7AV
// npm run command-nest holding-rewards-metadata cyber-armo
// npm run command-nest holding-rewards-metadata rough-pet
// npm run command-nest holding-rewards-metadata roboter-weapon
// npm run command-nest holding-rewards-metadata matrix-angel-car
// npm run command-nest holding-rewards-metadata ml-network-pass
// npm run command-nest holding-rewards-metadata particles-cosmetic-effect
// npm run command-nest holding-rewards-metadata shadow-gem
@Command({
  name: 'holding-rewards-metadata',
  description: 'Build json metadata (rewardCode, CIDMedia)',
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

    const rewardCode = passedParam[0];
    const cidIpfsMedia = passedParam[1];

    const data = this.generateMetadata(rewardCode, cidIpfsMedia);
    writeFileSync(
      `./data/holding-reward/${rewardCode}.json`,
      JSON.stringify(data, null, 2),
    );
  }

  generateMetadata(rewardCode: string, cidIpfsMedia): object {
    return {
      name: `Meta-Life: ${HOLDING_REWARDS_KEY_VALUE[rewardCode].name}`,
      description:
        'This NFT represents an holding reward whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends',
      image: this.getPathContent(cidIpfsMedia, rewardCode, 'gif'),
      animation_url: this.getPathContent(cidIpfsMedia, rewardCode, 'mp4'),
      attributes: HOLDING_REWARD_METADATA[rewardCode],
    };
  }

  getPathContent(cid: string, rewardCode: string, extension: string): string {
    return `${PINATA_URL}${cid}/${extension}/${rewardCode}.${extension}`;
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }
}
