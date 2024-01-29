import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { MetadataService } from '@src/metadata/metadata.service';
import { Collection } from '@src/collections/collection.model';
import {
  RESIDENCE_CID,
  RESIDENCE_CODE,
  RESIDENCE_DESCRIPTION,
  RESIDENCE_FILE_DRAWING,
  RESIDENCE_METADATA,
  RESIDENCE_NAME,
  RESIDENCE_SUPPLY,
  RESIDENCE_SUPPLY_DETAIL,
  RESIDENCE_URL_ANIMATION,
  RESIDENCE_URL_IMAGE,
} from '@src/enum/draw-residence';

/*
npm run command-nest metadata-residence
 */
@Command({
  name: 'metadata-residence',
  description: 'Build residence and media files',
})
@Injectable()
export class ResidenceService extends CommandRunner {
  private static readonly logger = new Logger(ResidenceService.name);
  constructor(private metadataService: MetadataService) {
    super();
  }

  async run() {
    ResidenceService.logger.log('[Command] ResidenceService');
    const residenceCollection: Collection = {
      name: RESIDENCE_NAME,
      code: RESIDENCE_CODE,
      fileDrawing: RESIDENCE_FILE_DRAWING,
      description: RESIDENCE_DESCRIPTION,
      cid: RESIDENCE_CID,
      urlImage: RESIDENCE_URL_IMAGE,
      urlAnimation: RESIDENCE_URL_ANIMATION,
      supply: RESIDENCE_SUPPLY,
      supplyDetail: RESIDENCE_SUPPLY_DETAIL,
      metadata: RESIDENCE_METADATA,
    };
    // Step 1
    //await this.metadataService.buildDrawingList(residenceCollection);
    // Step 2
    await this.metadataService.buildMetadata(residenceCollection);
  }
}
