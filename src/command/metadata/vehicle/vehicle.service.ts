import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { MetadataService } from '@src/metadata/metadata.service';
import { Collection } from '@src/collections/collection.model';

import {
  VEHICLE_CID,
  VEHICLE_CODE,
  VEHICLE_DESCRIPTION,
  VEHICLE_FILE_DRAWING,
  VEHICLE_METADATA,
  VEHICLE_METADATA_SPECIFIC,
  VEHICLE_NAME,
  VEHICLE_SUPPLY,
  VEHICLE_SUPPLY_DETAIL,
  VEHICLE_URL_ANIMATION,
  VEHICLE_URL_IMAGE,
} from '@src/enum/vehicle-draw';

/*
npm run command-nest metadata-vehicle
 */
@Command({
  name: 'metadata-vehicle',
  description: 'Build vehicle and media files',
})
@Injectable()
export class VehicleService extends CommandRunner {
  private static readonly logger = new Logger(VehicleService.name);
  constructor(private metadataService: MetadataService) {
    super();
  }

  async run() {
    VehicleService.logger.log('[Command] VehicleService');
    const vehicleCollection: Collection = {
      name: VEHICLE_NAME,
      code: VEHICLE_CODE,
      fileDrawing: VEHICLE_FILE_DRAWING,
      description: VEHICLE_DESCRIPTION,
      cid: VEHICLE_CID,
      urlImage: VEHICLE_URL_IMAGE,
      urlAnimation: VEHICLE_URL_ANIMATION,
      supply: VEHICLE_SUPPLY,
      supplyDetail: VEHICLE_SUPPLY_DETAIL,
      supplyDetailSpecific: null,
      metadata: VEHICLE_METADATA,
      metadataSpecific: VEHICLE_METADATA_SPECIFIC,
    };
    // Step 1
    // await this.metadataService.buildDrawingList(vehicleCollection);
    // Step 2
    await this.metadataService.buildMetadata(vehicleCollection);
  }
}
