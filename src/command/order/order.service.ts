import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { OgPetService } from '@src/eligibility/og-pet/og-pet.service';

@Command({
  name: 'order-init',
  description: 'Caching all holders',
})
@Injectable()
export class OrderService extends CommandRunner {
  private static readonly logger = new Logger(OrderService.name);
  constructor(private ogPetService: OgPetService) {
    super();
  }

  async run() {
    OrderService.logger.log('[Command] OrderService');
    const ogPets = this.ogPetService.findAll();
  }
}
