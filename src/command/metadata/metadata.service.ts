import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

// npm run command-nest metadata-build
@Command({
  name: 'metadata',
  description: 'Build metadata and media files',
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
