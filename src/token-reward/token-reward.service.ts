import { Injectable } from '@nestjs/common';
import { MintPackage } from '../mint-package/mint-package.entity';

export const PERK_LABEL_ARMOR = 'armor';
export const PERK_LABEL_PET = 'pet';
export const PERK_LABEL_VEHICLE = 'vehicle';
export const PERK_LABEL_RESIDENCE = 'residence';
export const PERK_LABEL_LAND = 'land';

export const PERK_RATIO_REWARD_ARMOR = 0.21;
export const PERK_RATIO_REWARD_PET = 0.82;
export const PERK_RATIO_REWARD_VEHICLE = 1.64;
export const PERK_RATIO_REWARD_RESIDENCE = 3.08;
export const PERK_RATIO_REWARD_LAND = 7.44;

export const REWARD_RATIOS = [
  {
    perk_label: PERK_LABEL_ARMOR,
    perk_ratio: PERK_RATIO_REWARD_ARMOR,
  },
  {
    perk_label: PERK_LABEL_PET,
    perk_ratio: PERK_RATIO_REWARD_PET,
  },
  {
    perk_label: PERK_LABEL_VEHICLE,
    perk_ratio: PERK_RATIO_REWARD_VEHICLE,
  },
  {
    perk_label: PERK_LABEL_RESIDENCE,
    perk_ratio: PERK_RATIO_REWARD_RESIDENCE,
  },
  {
    perk_label: PERK_LABEL_LAND,
    perk_ratio: PERK_RATIO_REWARD_LAND,
  },
];

@Injectable()
export class TokenRewardService {
  estimate(mintPackage: MintPackage, now: Date): number {
    const pricePackage = mintPackage.pricePaidEth / mintPackage.nbTokens;
    const rewardRatios = this.getRewardRatios(pricePackage);
    if (rewardRatios.length === 0) {
      return 0;
    }

    const mintDate = new Date(mintPackage.mintAt);
    if (isNaN(mintDate.getTime())) {
      throw new Error('Invalid date string: ' + mintPackage.mintAt);
    }

    const diffDays = this.getDaysBetweenDates(mintDate, now);
    if (isNaN(diffDays)) {
      throw new Error(
        'Invalid date range: ' + mintPackage.mintAt + ' - ' + now,
      );
    }

    let rewards = 0;
    rewardRatios.forEach((reward) => {
      rewards += diffDays * reward['perk_ratio'] * mintPackage.nbTokens;
    });

    const roundedRewards = rewards.toFixed(2);

    return Number(roundedRewards);
  }

  getDaysBetweenDates(startDate: Date, endDate: Date): number {
    // Hours * minutes * seconds * milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs((endDate.getTime() - startDate.getTime()) / oneDay),
    );
  }

  getRewardRatiosByPerkLabel(perkLabel): Array<object> | Array<null> {
    const index = REWARD_RATIOS.findIndex(
      (ratio) => ratio.perk_label === perkLabel,
    );
    if (index !== -1) {
      return REWARD_RATIOS.slice(0, index + 1);
    }

    return [];
  }

  definePerkPackage(pricePackage): string | null {
    if (pricePackage < 0.5) {
      return null;
    }
    if (pricePackage >= 2.5) {
      return PERK_LABEL_LAND;
    }
    if (pricePackage < 2.5 && pricePackage >= 2) {
      return PERK_LABEL_RESIDENCE;
    }
    if (pricePackage < 2 && pricePackage >= 1.5) {
      return PERK_LABEL_VEHICLE;
    }
    if (pricePackage < 1.5 && pricePackage >= 1) {
      return PERK_LABEL_PET;
    }
    if (pricePackage < 1 && pricePackage >= 0.5) {
      return PERK_LABEL_ARMOR;
    }
  }

  getRewardRatios(pricePackage): Array<object> {
    const perkLabel = this.definePerkPackage(pricePackage);

    return this.getRewardRatiosByPerkLabel(perkLabel);
  }

  getPerkPackages(mintPackages: MintPackage[], now: Date): object {
    let perkPackages = {
      [PERK_LABEL_ARMOR]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_PET]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_VEHICLE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_RESIDENCE]: { quantity: 0, tokens: 0 },
      [PERK_LABEL_LAND]: { quantity: 0, tokens: 0 },
    };

    mintPackages.forEach((mintPackage) => {
      const pricePackage = mintPackage.pricePaidEth / mintPackage.nbTokens;
      const perkLabel = this.definePerkPackage(pricePackage);
      const mintDate = new Date(mintPackage.mintAt);
      if (isNaN(mintDate.getTime())) {
        throw new Error('Invalid date string: ' + mintPackage.mintAt);
      }

      const diffDays = this.getDaysBetweenDates(mintDate, now);
      if (isNaN(diffDays)) {
        throw new Error(
          'Invalid date range: ' + mintPackage.mintAt + ' - ' + now,
        );
      }

      if (perkLabel === null) {
        return;
      }

      const rewardRatios = this.getRewardRatiosByPerkLabel(perkLabel);
      rewardRatios.map((rewardRatio) => {
        const perkLabel = rewardRatio['perk_label'];
        perkPackages[perkLabel]['quantity'] += mintPackage.nbTokens;
        const roundedRewards =
          diffDays * mintPackage.nbTokens * rewardRatio['perk_ratio'];
        perkPackages[perkLabel]['tokens'] += Number(roundedRewards.toFixed(2));
      });
    });

    return perkPackages;
  }
}
