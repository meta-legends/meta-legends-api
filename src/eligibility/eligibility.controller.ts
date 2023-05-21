import { Controller, Get, Header, Inject, Param } from '@nestjs/common';
import { OgPetService } from './og-pet/og-pet.service';

@Controller('eligibility')
export class EligibilityController {
  constructor(private ogPetService: OgPetService) {}

  @Header('content-type', 'application/json')
  @Get('og-pets/:walletAddress/estimate')
  async estimateOgPets(@Param('walletAddress') walletAddress: string) {
    const wallet = walletAddress.toLowerCase();
    return await this.ogPetService.getEstimateByWallet(wallet);
  }
}
