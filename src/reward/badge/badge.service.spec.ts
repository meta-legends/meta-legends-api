import { Test, TestingModule } from '@nestjs/testing';
import {
  BadgeService,
  PERK_BADGE_ARMOR_CYBER,
  PERK_BADGE_CYBER_PET,
  PERK_BADGE_GOLDBOI_CAR,
  PERK_BADGE_SNIPER_BRONZE,
  PERK_BADGE_SNIPER_RIFLE_CELESTIAL,
  PERK_BADGE_WEAPON_GOLDBOI,
} from './badge.service';

describe('BadgeService', () => {
  let service: BadgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadgeService],
    }).compile();

    service = module.get<BadgeService>(BadgeService);
  });

  it('should be estimate badge rewards', () => {
    const expectedData = [
      {
        nb: 0,
        expect: {
          [PERK_BADGE_SNIPER_BRONZE]: 0,
          [PERK_BADGE_ARMOR_CYBER]: 0,
          [PERK_BADGE_WEAPON_GOLDBOI]: 0,
          [PERK_BADGE_CYBER_PET]: 0,
          [PERK_BADGE_GOLDBOI_CAR]: 0,
          [PERK_BADGE_SNIPER_RIFLE_CELESTIAL]: 0,
        },
      },
      {
        nb: 32,
        expect: {
          [PERK_BADGE_SNIPER_BRONZE]: 1,
          [PERK_BADGE_ARMOR_CYBER]: 1,
          [PERK_BADGE_WEAPON_GOLDBOI]: 1,
          [PERK_BADGE_CYBER_PET]: 1,
          [PERK_BADGE_GOLDBOI_CAR]: 1,
          [PERK_BADGE_SNIPER_RIFLE_CELESTIAL]: 0,
        },
      },
      {
        nb: 90,
        expect: {
          [PERK_BADGE_SNIPER_BRONZE]: 2,
          [PERK_BADGE_ARMOR_CYBER]: 2,
          [PERK_BADGE_WEAPON_GOLDBOI]: 2,
          [PERK_BADGE_CYBER_PET]: 2,
          [PERK_BADGE_GOLDBOI_CAR]: 2,
          [PERK_BADGE_SNIPER_RIFLE_CELESTIAL]: 1,
        },
      },
    ];
    expectedData.map((testCase) => {
      expect(service.getBadgeRewards(testCase['nb'])).toEqual(
        testCase['expect'],
      );
    });
  });
});
