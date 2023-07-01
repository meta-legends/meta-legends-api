import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'test',
  description: 'Sandbox',
})
@Injectable()
export class TestService extends CommandRunner {
  private static readonly logger = new Logger(TestService.name);
  constructor() {
    super();
  }

  async run() {
    TestService.logger.log('[Command] TestService');
  }
}
