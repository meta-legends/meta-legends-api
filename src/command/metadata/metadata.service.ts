import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { MintService } from '@src/mint/mint.service';
import { AssetService } from '@src/asset/asset.service';
import { UserService } from '@src/user/user.service';

@Command({
  name: 'fill-metadata',
  description: 'Put metadata',
})
@Injectable()
export class MetadataService extends CommandRunner {
  private static readonly logger = new Logger(MetadataService.name);
  constructor(
    private mintService: MintService,
    private assetService: AssetService,
    private userService: UserService,
  ) {
    super();
  }

  async run() {
    MetadataService.logger.log('[Command] MetadataService');
    this.mintService.generateMetadata(1, 'test', 'testa');
    const asset = await this.assetService.findOneByCode('og-pets');
    const user = await this.userService.findOne(
      '0x24df9f5a2624db695ee695399fd43deb62c475bd',
    );
    await this.mintService.triggerMinted(asset, user, 5);
  }
}
