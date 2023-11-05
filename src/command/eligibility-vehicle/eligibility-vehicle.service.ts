import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { EligibilityService } from '@src/eligibility/eligibility.service';
import { MintPackageService } from '@src/mint-package/mint-package.service';

// npm run command-nest build-eligibility-vehicle
@Command({
  name: 'build-eligibility-vehicle',
  description: 'Build csv, input for the contract and insert data',
})
@Injectable()
export class EligibilityVehicleService extends CommandRunner {
  private static readonly logger = new Logger(EligibilityVehicleService.name);

  constructor(
    private eligibilityService: EligibilityService,
    private mintPackage: MintPackageService,
  ) {
    super();
  }

  async run() {
    const listWhales = await this.eligibilityService.getListWhale();
    let countWhale = 0;
    Object.keys(listWhales).forEach((wallet) => {
      countWhale += listWhales[wallet];
    });
    console.log(
      `NB NFT whale : ${countWhale} (${
        Object.keys(listWhales).length
      } wallets)`,
    );
    const listHonoraries = await this.eligibilityService.getListHonorary();
    let countHonorary = 0;
    Object.keys(listHonoraries).forEach((wallet) => {
      countHonorary += listHonoraries[wallet];
    });
    console.log(
      `NB NFT Honorary : ${countHonorary} (${
        Object.keys(listHonoraries).length
      } wallets)`,
    );
    const listCouncils = await this.eligibilityService.getListCouncil();
    let countCouncil = 0;
    Object.keys(listCouncils).forEach((wallet) => {
      countCouncil += listCouncils[wallet];
    });
    console.log(
      `NB NFT council : ${countCouncil} (${
        Object.keys(listCouncils).length
      } wallets)`,
    );

    const listPerks = await this.mintPackage.getListPerkVehicle();
    let countPerks = 0;
    Object.keys(listPerks).forEach((wallet) => {
      countPerks += listPerks[wallet];
    });
    console.log(
      `NB NFT Perks : ${countPerks} (${Object.keys(listPerks).length} wallets)`,
    );
  }
}
