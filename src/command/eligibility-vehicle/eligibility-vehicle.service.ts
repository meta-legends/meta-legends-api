import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { EligibilityService } from '@src/eligibility/eligibility.service';
import { MintPackageService } from '@src/mint-package/mint-package.service';
import { FileService } from '@src/file/file.service';
import * as moment from 'moment/moment';

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
    private fileService: FileService,
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

    const listPerks = await this.mintPackage.getListPerk(1.5);
    let countPerks = 0;
    Object.keys(listPerks).forEach((wallet) => {
      countPerks += listPerks[wallet];
    });
    console.log(
      `NB NFT Perks : ${countPerks} (${Object.keys(listPerks).length} wallets)`,
    );
    const now = moment().format('YYYYMMDDHHmmss');
    const allLists = [
      {
        filepath: `data/vehicle/${now}_listWhales`,
        data: listWhales,
      },
      {
        filepath: `data/vehicle/${now}_listHonoraries`,
        data: listHonoraries,
      },
      {
        filepath: `data/vehicle/${now}_listCouncils`,
        data: listCouncils,
      },
      {
        filepath: `data/vehicle/${now}_listPerks`,
        data: listPerks,
      },
    ];

    allLists.forEach((list) => {
      this.fileService.buildListEligibility(list['data'], list['filepath']);
      this.fileService.buildCsv(list['data'], list['filepath']);
    });
  }
}
