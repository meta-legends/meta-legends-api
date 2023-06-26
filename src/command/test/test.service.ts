import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { writeFileSync, copyFile } from 'fs';
import {
  OG_PET_REGULAR_RARITY,
  REG_NAME_PET_BURNER_TIERS_1,
  REG_NAME_PET_BURNER_TIERS_2,
  REG_NAME_PET_BURNER_TIERS_3,
  REG_NAME_PET_CELESTIAL_TIERS_1,
  REG_NAME_PET_CELESTIAL_TIERS_2,
  REG_NAME_PET_CELESTIAL_TIERS_3,
  REG_NAME_PET_CYBER_TIERS_1,
  REG_NAME_PET_CYBER_TIERS_2,
  REG_NAME_PET_CYBER_TIERS_3,
  REG_NAME_PET_GOLDBOI_TIERS_1,
  REG_NAME_PET_GOLDBOI_TIERS_2,
  REG_NAME_PET_GOLDBOI_TIERS_3,
  REG_NAME_PET_MATRIX_TIERS_1,
  REG_NAME_PET_MATRIX_TIERS_2,
  REG_NAME_PET_MATRIX_TIERS_3,
  REG_NAME_PET_ROBOTER_TIERS_1,
  REG_NAME_PET_ROBOTER_TIERS_2,
  REG_NAME_PET_ROBOTER_TIERS_3,
  REG_NAME_PET_ROUGH_TIERS_1,
  REG_NAME_PET_ROUGH_TIERS_2,
  REG_NAME_PET_ROUGH_TIERS_3,
} from '@src/enum/og-pet-draw';
import { MintService } from '@src/mint/mint.service';

@Command({
  name: 'test',
  description: 'Sandbox',
})
@Injectable()
export class TestService extends CommandRunner {
  private static readonly logger = new Logger(TestService.name);
  constructor(private mintService: MintService) {
    super();
  }

  async run() {
    TestService.logger.log('[Command] TestService');
    const result = {
      [REG_NAME_PET_ROUGH_TIERS_1]: 0,
      [REG_NAME_PET_ROUGH_TIERS_2]: 0,
      [REG_NAME_PET_ROUGH_TIERS_3]: 0,
      [REG_NAME_PET_CYBER_TIERS_1]: 0,
      [REG_NAME_PET_CYBER_TIERS_2]: 0,
      [REG_NAME_PET_CYBER_TIERS_3]: 0,
      [REG_NAME_PET_MATRIX_TIERS_1]: 0,
      [REG_NAME_PET_MATRIX_TIERS_2]: 0,
      [REG_NAME_PET_MATRIX_TIERS_3]: 0,
      [REG_NAME_PET_GOLDBOI_TIERS_1]: 0,
      [REG_NAME_PET_GOLDBOI_TIERS_2]: 0,
      [REG_NAME_PET_GOLDBOI_TIERS_3]: 0,
      [REG_NAME_PET_ROBOTER_TIERS_1]: 0,
      [REG_NAME_PET_ROBOTER_TIERS_2]: 0,
      [REG_NAME_PET_ROBOTER_TIERS_3]: 0,
      [REG_NAME_PET_BURNER_TIERS_1]: 0,
      [REG_NAME_PET_BURNER_TIERS_2]: 0,
      [REG_NAME_PET_BURNER_TIERS_3]: 0,
      [REG_NAME_PET_CELESTIAL_TIERS_1]: 0,
      [REG_NAME_PET_CELESTIAL_TIERS_2]: 0,
      [REG_NAME_PET_CELESTIAL_TIERS_3]: 0,
    };
    const supply = 1072;

    for (let i = 1; i <= supply; i++) {
      const prize = this.suffle(OG_PET_REGULAR_RARITY, result);
      if (prize == null) {
        i--;
        continue;
      }
      result[prize.pet]++;
      const data = this.mintService.generateMetadata(i, prize.pet);
      writeFileSync(`./data/metadata/${i}.json`, JSON.stringify(data, null, 2));
      copyFile(
        `./data/og-pets/origin/gifs/${prize.gif}`,
        `./data/gif/${i}.gif`,
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          } else {
            console.log('\nGIF of copied_file: ' + prize.pet);
          }
        },
      );
      copyFile(
        `./data/og-pets/origin/video/${prize.video}`,
        `./data/video/${i}.mp4`,
        (err) => {
          if (err) {
            console.log('Error Found:', err);
          } else {
            console.log('\nVIDEO of copied_file: ' + prize.pet);
          }
        },
      );
      console.log(i);
    }

    console.log(result);
  }

  suffle(rafflePrize, result) {
    // Vérifier si le tableau est vide
    if (rafflePrize.length === 0) {
      console.log('Raffle prize emtpy');
      return null;
    }

    // Calculer le total des pourcentages de chance
    let totalChances = 0;
    rafflePrize.forEach((lot) => {
      totalChances += lot.percent;
    });

    const random = Math.random() * totalChances;

    let lucky = 0;
    for (let i = 0; i < rafflePrize.length; i++) {
      const lot = rafflePrize[i];

      if (result[lot.pet] == lot.supply) {
        continue;
      }

      lucky += lot.percent;

      if (random < lucky) {
        return lot;
      }
    }

    return null;
  }
}
