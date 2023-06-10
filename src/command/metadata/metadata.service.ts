import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { OgPetService } from '@src/eligibility/og-pet/og-pet.service';
import { UserService } from '@src/user/user.service';
import { MintOrderService } from '@src/mint-order/mint-order.service';
import { AssetService } from '@src/asset/asset.service';

@Command({
  name: 'fill-metadata',
  description: 'Put metadata',
})
@Injectable()
export class MetadataService extends CommandRunner {
  private static readonly logger = new Logger(MetadataService.name);
  constructor(
    private ogPetService: OgPetService,
    private userService: UserService,
    private mintOrderService: MintOrderService,
    private assetService: AssetService,
  ) {
    super();
  }

  async run() {
    MetadataService.logger.log('[Command] MetadataService');
  }
}
