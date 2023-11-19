import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import {
  HEALING_DRONE_FILE_DRAWING,
  HEALING_DRONE_SUPPLY_DETAIL,
  HEALING_DRONE_SUPPLY,
  HEALING_DRONE_METADATA,
  HEALING_DRONE_DESCRIPTION,
  HEALING_DRONE_CID,
  HEALING_DRONE_URL_IMAGE,
  HEALING_DRONE_URL_ANIMATION,
  HEALING_DRONE_NAME,
  HEALING_DRONE_CODE,
} from '@src/enum/healing-drone-draw';
import { MetadataService } from '@src/metadata/metadata.service';
import { Collection } from '@src/collections/collection.model';

// - construction du fichier csv tenant compte de la rareté des assets
// - construction des fichiers JSON en fonction du fichier CSV

// npm run command-nest metadata-healing-drone
@Command({
  name: 'metadata-healing-drone',
  description: 'Build metadata and media files',
})
@Injectable()
export class HealingDroneService extends CommandRunner {
  private static readonly logger = new Logger(HealingDroneService.name);
  constructor(private metadataService: MetadataService) {
    super();
  }

  async run() {
    HealingDroneService.logger.log('[Command] HealingDroneService');
    const healingDroneCollection: Collection = {
      name: HEALING_DRONE_NAME,
      code: HEALING_DRONE_CODE,
      fileDrawing: HEALING_DRONE_FILE_DRAWING,
      description: HEALING_DRONE_DESCRIPTION,
      cid: HEALING_DRONE_CID,
      urlImage: HEALING_DRONE_URL_IMAGE,
      urlAnimation: HEALING_DRONE_URL_ANIMATION,
      supply: HEALING_DRONE_SUPPLY,
      supplyDetail: HEALING_DRONE_SUPPLY_DETAIL,
      metadata: HEALING_DRONE_METADATA,
      metadataSpecific: {},
    };
    // STEP 1: BUILD csv list and check supply per item
    // await this.metadataService.buildDrawingList(healingDroneCollection);
    // STEP 2 : BUILD metadata
    await this.metadataService.buildMetadata(healingDroneCollection);
  }
}
