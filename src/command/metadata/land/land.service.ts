import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';

/*
npm run command-nest metadata-land
 */
@Command({
  description: 'Build land and media files',
  name: 'metadata-land',
})
@Injectable()
export class LandService extends CommandRunner {
  private static readonly logger = new Logger(LandService.name);
  constructor(private landWishService: LandWishService) {
    super();
  }

  // attributes:
  //   class
  //   category
  //   guardian
  async run() {
    LandService.logger.log('[Command] LandService');
    const landWishes = this.landWishService.getAll();
  }

  initMetadata() {

  }
}
