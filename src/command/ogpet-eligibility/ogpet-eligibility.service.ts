import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { OgPetService } from '@src/eligibility/og-pet/og-pet.service';
import { AlchemyService } from '@src/client/alchemy/alchemy.service';

@Command({
  name: 'pets-eligible-no-holder',
  description: 'List wallet eligible to mint OG Pets without ML NFT',
})
@Injectable()
export class OgpetEligibilityService extends CommandRunner {
  private static readonly logger = new Logger(OgpetEligibilityService.name);
  constructor(
    private ogPetService: OgPetService,
    private alchemyService: AlchemyService,
  ) {
    super();
  }

  async run() {
    OgpetEligibilityService.logger.log('[Command] OgpetEligibilityService');

    const holderAddresses = [];
    const res = await this.alchemyService.getOwnersForCollectionML();
    res.ownerAddresses.map((holderData) => {
      holderAddresses.push(holderData.ownerAddress);
    });

    const ogPets = await this.ogPetService.findAll();
    let countMint = 0;
    let countOG = 0;
    let countMintAndOG = 0;
    ogPets.map((ogPet) => {
      if (ogPet.og > 0 && ogPet.mint > 0) {
        if (!holderAddresses.includes(ogPet.address)) {
          console.log(ogPet.address);
          countMintAndOG++;
        }
        return;
      }

      if (ogPet.og > 0) {
        if (!holderAddresses.includes(ogPet.address)) {
          console.log(ogPet.address);
          countOG++;
        }
        return;
      }

      if (ogPet.mint > 0) {
        if (!holderAddresses.includes(ogPet.address)) {
          console.log(ogPet.address);
          countMint++;
        }
        return;
      }
    });

    console.log('countMint: ' + countMint);
    console.log('countOG: ' + countOG);
    console.log('countMintAndOG: ' + countMintAndOG);
  }
}
