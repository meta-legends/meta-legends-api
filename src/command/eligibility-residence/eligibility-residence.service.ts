import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { EligibilityService } from '@src/eligibility/eligibility.service';
import { MintPackageService } from '@src/mint-package/mint-package.service';
import { FileService } from '@src/file/file.service';
import * as moment from 'moment/moment';

// npm run command-nest build-eligibility-residence
@Command({
  name: 'build-eligibility-residence',
  description: 'Build csv, input for the contract and insert data',
})
@Injectable()
export class EligibilityResidenceService extends CommandRunner {
  private static readonly logger = new Logger(EligibilityResidenceService.name);

  constructor(
    private eligibilityService: EligibilityService,
    private mintPackage: MintPackageService,
    private fileService: FileService,
  ) {
    super();
  }

  async run() {
    const judgePerks = {
      '0x33acb35738c1dc2975fc2b1d00a765ed425b624e': 2,
      '0xe963229affb535c05256c97e5142283162de77d2': 2,
      '0x34357dc6be6a22ae49474596eca31ce56284266f': 2,
      '0x6415eed12d08e5d9f6b8cab488696c7fb046054d': 2,
      '0x5d5332dca7266849cf6a116d42633e3e75934cf6': 2,
      '0x73203947832813d46763e468795f6e023b764c8b': 2,
      '0xfa14705074d4b67835098538a01c91133dfedcc1': 2,
      '0x7886e22d187dcf6dd6ab8012cc7ca99702eaeac4': 2,
      '0x7e58dae8be10160adc2fcf8ead3cdaf880480c62': 2,
      '0x24df9f5a2624db695ee695399fd43deb62c475bd': 2,
    };

    const listPerks = await this.mintPackage.getListPerk(2);
    let countPerks = 0;
    Object.keys(listPerks).forEach((wallet) => {
      countPerks += listPerks[wallet];
    });

    Object.keys(judgePerks).forEach((wallet) => {
      if (Object.keys(listPerks).includes(wallet)) {
        console.log(`${wallet} : ${listPerks[wallet]} + ${judgePerks[wallet]}`)
        listPerks[wallet] += judgePerks[wallet];
      } else {
        listPerks[wallet] = judgePerks[wallet];
      }
    });

    console.log(
      `NB NFT Perks : ${countPerks} (${Object.keys(listPerks).length} wallets)`,
    );
    const now = moment().format('YYYYMMDDHHmmss');
    const allLists = [
      {
        filepath: `data/og-residence/${now}_listPerks`,
        data: listPerks,
      },
    ];

    allLists.forEach((list) => {
      this.fileService.buildListEligibility(list['data'], list['filepath']);
      this.fileService.buildCsv(list['data'], list['filepath']);
    });
  }
}
