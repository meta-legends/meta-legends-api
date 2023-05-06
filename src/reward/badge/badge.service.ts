// import {Injectable} from '@nestjs/common';

// @Injectable()

export const PERK_BADGE_SNIPER_BRONZE = 'sniper-bronze';
export const PERK_BADGE_ARMOR_CYBER = 'armor-cyber';
export const PERK_BADGE_WEAPON_GOLDBOI = 'weapon-goldboi';
export const PERK_BADGE_CYBER_PET = 'cyber-pet';
export const PERK_BADGE_GOLDBOI_CAR = 'goldboi-car';
export const PERK_BADGE_SNIPER_RIFLE_CELESTIAL = 'sniper-rifle-celestial';

export class BadgeService {

  getBadgeRewards(nbNftHold: number): object {
    if (nbNftHold === 0) {
      return this.initBadgeRewards(0);
    }

    const badgeRewardsValue = Math.floor(Number(nbNftHold / 51));
    const badgeRewards = this.initBadgeRewards(badgeRewardsValue);
    const moduloNbNft = nbNftHold % 51;

    if (moduloNbNft > 20) {
      badgeRewards[PERK_BADGE_GOLDBOI_CAR]++;
    }
    if (moduloNbNft > 10) {
      badgeRewards[PERK_BADGE_CYBER_PET]++;
    }
    if (moduloNbNft > 5) {
      badgeRewards[PERK_BADGE_WEAPON_GOLDBOI]++;
    }
    if (moduloNbNft > 2) {
      badgeRewards[PERK_BADGE_ARMOR_CYBER]++;
    }
    if (moduloNbNft > 0) {
      badgeRewards[PERK_BADGE_SNIPER_BRONZE]++;
    }

    return badgeRewards;
  }

  initBadgeRewards(initValue): object {
    return {
      [PERK_BADGE_SNIPER_BRONZE]: initValue,
      [PERK_BADGE_ARMOR_CYBER]: initValue,
      [PERK_BADGE_WEAPON_GOLDBOI]: initValue,
      [PERK_BADGE_CYBER_PET]: initValue,
      [PERK_BADGE_GOLDBOI_CAR]: initValue,
      [PERK_BADGE_SNIPER_RIFLE_CELESTIAL]: initValue,
    };
  }
}
