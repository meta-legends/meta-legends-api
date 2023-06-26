import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'fill-metadata',
  description: 'Put metadata',
})
@Injectable()
export class MetadataService extends CommandRunner {
  private static readonly logger = new Logger(MetadataService.name);
  constructor() {
    super();
  }

  async run() {
    MetadataService.logger.log('[Command] MetadataService');
  }
}
