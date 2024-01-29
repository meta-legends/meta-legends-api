import { Injectable } from '@nestjs/common';
import { Collection } from '@src/collections/collection.model';
import { readFile, writeFile, writeFileSync } from 'fs';

@Injectable()
export class MetadataService {
  generate(collection: Collection, id: number, mediaName = null): object {
    const code = mediaName ?? id;
    const data = {
      name: `${collection.name} #${id}`,
      description: `${collection.description}`,
      image: `${collection.urlImage}/${code}.gif`,
    };
    if (collection.urlAnimation !== null) {
      data['animation_url'] = `${collection.urlAnimation}/${code}.mp4`;
    }
    data['attributes'] = collection.metadata[code];

    return data;
  }

  buildMetadata(collection: Collection) {
    readFile(collection.fileDrawing, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const result = data.split('\n');
        let id = 0;
        result.forEach((code) => {
          const data = this.generate(collection, id, code);
          writeFileSync(
            `./data/${collection.code}/metadata/${id}`,
            JSON.stringify(data, null, 2),
          );
          console.log(id, code);
          id++;
        });
      }
    });
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

      if (result[lot.code] == lot.supply) {
        continue;
      }

      lucky += lot.percent;

      if (random < lucky) {
        return lot;
      }
    }

    return null;
  }

  buildDrawingList(collection: Collection) {
    const result = [];
    const countSupply = {};

    for (let i = 1; i <= collection.supply; i++) {
      const prize = this.suffle(collection.supplyDetail, countSupply);
      if (prize == null) {
        i--;
        continue;
      }
      if (countSupply.hasOwnProperty(prize.code)) {
        countSupply[prize.code]++;
      } else {
        countSupply[prize.code] = 1;
      }
      result.push(prize.code);
      console.log(i, prize.code);
    }

    let sum = 0;
    Object.keys(countSupply).forEach((key) => {
      sum += countSupply[key];
    });
    console.log(countSupply);

    writeFile(`./${collection.fileDrawing}`, result.join('\n'), (err) => {
      if (err) {
        console.log('Error Found:', err);
      } else {
        console.log(`\nList ok ${sum}`);
      }
    });
  }
}
