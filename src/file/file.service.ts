import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';

@Injectable()
export class FileService {
  buildListEligibility(eligibilities, filePath) {
    const wallets = [];
    Object.keys(eligibilities).forEach((wallet) => {
      wallets.push(wallet);
    });
    const listWallet = [];
    const listQuantity = [];
    const rows = [];
    const limit = 200;
    let index = 1;
    wallets.forEach((wallet) => {
      listWallet.push(wallet);
      listQuantity.push(eligibilities[wallet]);
      if (index % limit == 0 || wallets.length == index) {
        rows.push(listWallet.join(','));
        rows.push(listQuantity.join(','));
        listWallet.length = 0;
        listQuantity.length = 0;
      }
      index++;
    });
    writeFile(filePath, rows.join('\n'), (err) => {
      if (err) {
        console.log('Error Found:', err);
      } else {
        console.log('\nList elibility ok');
      }
    });
  }

  buildCsv(eligibilities, filePath) {
    const rows = [];
    const wallets = [];
    Object.keys(eligibilities).forEach((wallet) => {
      wallets.push(wallet);
    });
    wallets.forEach((wallet) => {
      rows.push(`${wallet},${eligibilities[wallet]}`);
    });
    writeFile(filePath + '.csv', rows.join('\n'), (err) => {
      if (err) {
        console.log('Error Found:', err);
      } else {
        console.log('\nList csv ok');
      }
    });
  }
}
