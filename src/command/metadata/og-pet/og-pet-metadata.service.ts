import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { readFile, writeFile, writeFileSync, copyFile } from 'fs';
import {
  OG_PET_REGULAR_RARITY,
  OG_PET_SPECIFIC_SUPPLY,
  OG_PETS,
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
  SPECIFIC_NAME_PET_COUNCIL,
  SPECIFIC_NAME_PET_GUARDIAN,
  SPECIFIC_NAME_PET_HONORARY,
  SPECIFIC_NAME_PET_JUDGE,
  SPECIFIC_NAME_PET_WHALE,
} from '@src/enum/og-pet-draw';
import { MintService } from '@src/mint/mint.service';

// npm run command-nest metadata-build
@Command({
  name: 'metadata-build',
  description: 'Build metadata and media files',
})
@Injectable()
export class OgPetMetadataService extends CommandRunner {
  private static readonly logger = new Logger(OgPetMetadataService.name);
  constructor(private mintService: MintService) {
    super();
  }

  async run() {
    OgPetMetadataService.logger.log('[Command] OgPetMetadataService');
    // BUILD csv list
    // this.buildList();

    // CHECK SUPPLY on csv file
    // this.checkSupply();

    // COPY and FILL Directory with media to fill pinata
    // this.fillMedia();

    // REQUIRED: send media content on pinata and fill CID Ipfs to build metadata
    this.fillMetadata();
  }

  fillMetadata() {
    readFile('list-og-pets.csv', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const result = data.split('\n');
        let id = 1;
        result.forEach((name) => {
          const data = this.mintService.generateMetadata(id, name);
          writeFileSync(`./data/metadata/${id}`, JSON.stringify(data, null, 2));
          console.log(id, name);
          id++;
        });
      }
    });
  }

  fillMedia() {
    readFile('list-og-pets.csv', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const result = data.split('\n');
        let tokenIndexCurrent = 1;
        result.forEach((name) => {
          const draw = OG_PETS[name];
          copyFile(
            `./data/og-pets/origin/gifs/${draw.gif}`,
            `./data/gif/${tokenIndexCurrent}.gif`,
            (err) => {
              if (err) {
                console.log('Error Found:', err);
              } else {
                console.log(
                  `\nGIF of copied_file: ${tokenIndexCurrent} - ${draw.pet}`,
                );
              }
            },
          );
          copyFile(
            `./data/og-pets/origin/video/${draw.video}`,
            `./data/video/${tokenIndexCurrent}.mp4`,
            (err) => {
              if (err) {
                console.log('Error Found:', err);
              } else {
                console.log(
                  `\nVIDEO of copied_file: ${tokenIndexCurrent} - ${draw.pet}`,
                );
              }
            },
          );
          tokenIndexCurrent++;
        });
      }
    });
  }

  checkSupply() {
    readFile('list-og-pets.csv', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const countSupply = {
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
          [SPECIFIC_NAME_PET_COUNCIL]: 0,
          [SPECIFIC_NAME_PET_HONORARY]: 0,
          [SPECIFIC_NAME_PET_GUARDIAN]: 0,
          [SPECIFIC_NAME_PET_JUDGE]: 0,
          [SPECIFIC_NAME_PET_WHALE]: 0,
        };
        const result = data.split('\n');
        result.forEach((pet) => {
          countSupply[pet]++;
        });

        console.log(countSupply);
      }
    });
  }

  buildList() {
    const result = [];

    const countSupply = {
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
      [SPECIFIC_NAME_PET_COUNCIL]: 0,
      [SPECIFIC_NAME_PET_HONORARY]: 0,
      [SPECIFIC_NAME_PET_GUARDIAN]: 0,
      [SPECIFIC_NAME_PET_JUDGE]: 0,
      [SPECIFIC_NAME_PET_WHALE]: 0,
    };

    const supplyRandom = 1056;
    for (let i = 1; i <= supplyRandom; i++) {
      const prize = this.suffle(OG_PET_REGULAR_RARITY, countSupply);
      if (prize == null) {
        i--;
        continue;
      }
      countSupply[prize.pet]++;
      result.push(prize.pet);
      console.log(i, prize.pet);
    }

    let tokenIdCurrent = 1057;
    OG_PET_SPECIFIC_SUPPLY.forEach((perk) => {
      for (let i = 1; i <= perk['supply']; i++) {
        countSupply[perk.pet]++;
        result.push(perk.pet);
        tokenIdCurrent++;
      }
    });

    let sum = 0;
    Object.keys(countSupply).forEach((key) => {
      sum += countSupply[key];
    });

    writeFile(`./list-og-pets.csv`, result.join('\n'), (err) => {
      if (err) {
        console.log('Error Found:', err);
      } else {
        console.log('\nList ok');
      }
    });
  }

  generateFile(index, draw) {
    const data = this.mintService.generateMetadata(index, draw.pet);
    writeFileSync(
      `./data/metadata/${index}.json`,
      JSON.stringify(data, null, 2),
    );
    copyFile(
      `./data/og-pets/origin/gifs/${draw.gif}`,
      `./data/gif/${index}.gif`,
      (err) => {
        if (err) {
          console.log('Error Found:', err);
        } else {
          console.log('\nGIF of copied_file: ' + draw.pet);
        }
      },
    );
    copyFile(
      `./data/og-pets/origin/video/${draw.video}`,
      `./data/video/${index}.mp4`,
      (err) => {
        if (err) {
          console.log('Error Found:', err);
        } else {
          console.log('\nVIDEO of copied_file: ' + draw.pet);
        }
      },
    );
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
