import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { OgPetService } from '@src/eligibility/og-pet/og-pet.service';
import { UserService } from '@src/user/user.service';
import { AssetService } from '@src/asset/asset.service';

@Command({
  name: 'order-init',
  description: 'Caching all holders',
})
@Injectable()
export class OrderService extends CommandRunner {
  private static readonly logger = new Logger(OrderService.name);
  constructor(
    private ogPetService: OgPetService,
    private userService: UserService,
    private assetService: AssetService,
  ) {
    super();
  }

  async run() {
    OrderService.logger.log('[Command] OrderService');
    const ogPets = await this.ogPetService.findAll();
    const asset = await this.assetService.findOneByCode('og-pets');

  }
}
