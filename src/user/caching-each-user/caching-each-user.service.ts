import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { UserService } from '../user/user.service';

@Command({
  name: 'caching-each-user',
  description: 'Caching all holders',
})
@Injectable()
export class CachingEachUserService extends CommandRunner {
  private static readonly logger = new Logger(CachingEachUserService.name);
  constructor(private userService: UserService) {
    super();
  }

  async run() {
    CachingEachUserService.logger.log('[Command] CachingEachUserService');
    await this.userService.cachingHolders();
  }
}
