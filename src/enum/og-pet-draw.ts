export const REG_NAME_PET_ROUGH_TIERS_1 = 'CHICKENOX';
export const REG_NAME_PET_ROUGH_TIERS_2 = 'ARACHIR';
export const REG_NAME_PET_ROUGH_TIERS_3 = 'REKTOR';
export const REG_NAME_PET_CYBER_TIERS_1 = 'SQUIRREX';
export const REG_NAME_PET_CYBER_TIERS_2 = 'X-FANG';
export const REG_NAME_PET_CYBER_TIERS_3 = 'C-HOUND';
export const REG_NAME_PET_MATRIX_TIERS_1 = 'ARIOX';
export const REG_NAME_PET_MATRIX_TIERS_2 = 'DOMENOX';
export const REG_NAME_PET_MATRIX_TIERS_3 = 'XEPIROX';
export const REG_NAME_PET_GOLDBOI_TIERS_1 = 'NISUS';
export const REG_NAME_PET_GOLDBOI_TIERS_2 = 'ARRIUS';
export const REG_NAME_PET_GOLDBOI_TIERS_3 = 'FAMUZA';
export const REG_NAME_PET_ROBOTER_TIERS_1 = 'PRONGHAR';
export const REG_NAME_PET_ROBOTER_TIERS_2 = 'RHINOZOR';
export const REG_NAME_PET_ROBOTER_TIERS_3 = 'HREKTION';
export const REG_NAME_PET_BURNER_TIERS_1 = 'ENFORCER';
export const REG_NAME_PET_BURNER_TIERS_2 = 'DESTRUCTOR';
export const REG_NAME_PET_BURNER_TIERS_3 = 'MANTIS';
export const REG_NAME_PET_CELESTIAL_TIERS_1 = 'SPIRIG';
export const REG_NAME_PET_CELESTIAL_TIERS_2 = 'DRAGNOR';
export const REG_NAME_PET_CELESTIAL_TIERS_3 = 'FALCOZ';

export const PERCENT_PET_ROUGH_TIERS_1 = 10;
export const PERCENT_PET_ROUGH_TIERS_2 = 8;
export const PERCENT_PET_ROUGH_TIERS_3 = 5;
export const PERCENT_PET_CYBER_TIERS_1 = 9;
export const PERCENT_PET_CYBER_TIERS_2 = 7;
export const PERCENT_PET_CYBER_TIERS_3 = 4;
export const PERCENT_PET_MATRIX_TIERS_1 = 8;
export const PERCENT_PET_MATRIX_TIERS_2 = 6;
export const PERCENT_PET_MATRIX_TIERS_3 = 3;
export const PERCENT_PET_GOLDBOI_TIERS_1 = 7;
export const PERCENT_PET_GOLDBOI_TIERS_2 = 4;
export const PERCENT_PET_GOLDBOI_TIERS_3 = 2;
export const PERCENT_PET_ROBOTER_TIERS_1 = 5;
export const PERCENT_PET_ROBOTER_TIERS_2 = 4;
export const PERCENT_PET_ROBOTER_TIERS_3 = 2;
export const PERCENT_PET_BURNER_TIERS_1 = 5;
export const PERCENT_PET_BURNER_TIERS_2 = 2.5;
export const PERCENT_PET_BURNER_TIERS_3 = 1.5;
export const PERCENT_PET_CELESTIAL_TIERS_1 = 4;
export const PERCENT_PET_CELESTIAL_TIERS_2 = 2;
export const PERCENT_PET_CELESTIAL_TIERS_3 = 1;

export const SUPPLY_PET_ROUGH_TIERS_1 = 108;
export const SUPPLY_PET_ROUGH_TIERS_2 = 86;
export const SUPPLY_PET_ROUGH_TIERS_3 = 54;
export const SUPPLY_PET_CYBER_TIERS_1 = 97;
export const SUPPLY_PET_CYBER_TIERS_2 = 76;
export const SUPPLY_PET_CYBER_TIERS_3 = 42;
export const SUPPLY_PET_MATRIX_TIERS_1 = 86;
export const SUPPLY_PET_MATRIX_TIERS_2 = 65;
export const SUPPLY_PET_MATRIX_TIERS_3 = 32;
export const SUPPLY_PET_GOLDBOI_TIERS_1 = 76;
export const SUPPLY_PET_GOLDBOI_TIERS_2 = 42;
export const SUPPLY_PET_GOLDBOI_TIERS_3 = 21;
export const SUPPLY_PET_ROBOTER_TIERS_1 = 54;
export const SUPPLY_PET_ROBOTER_TIERS_2 = 42;
export const SUPPLY_PET_ROBOTER_TIERS_3 = 21;
export const SUPPLY_PET_BURNER_TIERS_1 = 55;
export const SUPPLY_PET_BURNER_TIERS_2 = 26;
export const SUPPLY_PET_BURNER_TIERS_3 = 16;
export const SUPPLY_PET_CELESTIAL_TIERS_1 = 42;
export const SUPPLY_PET_CELESTIAL_TIERS_2 = 21;
export const SUPPLY_PET_CELESTIAL_TIERS_3 = 10;

export const SPECIFIC_PET_FOR_COUNCIL = 'council';
export const SPECIFIC_PET_FOR_HONORARY = 'honorary';
export const SPECIFIC_PET_FOR_GUARDIAN = 'guardian';
export const SPECIFIC_PET_FOR_JUDGE = 'judge';
export const SPECIFIC_PET_FOR_TOP10 = 'top 10';

export const SUPPLY_PET_COUNCIL = 305;
export const SUPPLY_PET_HONORARY = 66;
export const SUPPLY_PET_GUARDIAN = 36;
export const SUPPLY_PET_JUDGE = 11;
export const SUPPLY_PET_TOP10 = 10;

export const SPECIFIC_NAME_PET_GUARDIAN = 'Silver Roboter Pronghar';
export const SPECIFIC_NAME_PET_COUNCIL = 'Council Matrix Xepirox';
export const SPECIFIC_NAME_PET_TOP10 = 'Gold Celestial Falcoz';
export const SPECIFIC_NAME_PET_JUDGE = 'Judge Goldboi Nisus';
export const SPECIFIC_NAME_PET_HONORARY = 'Honorary Burner Mantis';

export const OG_PET_SPECIFIC_SUPPLY = [
  {
    for: SPECIFIC_PET_FOR_COUNCIL,
    pet: SPECIFIC_NAME_PET_GUARDIAN,
    supply: SUPPLY_PET_COUNCIL,
    gif: 'specific_council.gif',
    video: 'specific_council.mp4',
  },
  {
    for: SPECIFIC_PET_FOR_HONORARY,
    pet: SPECIFIC_NAME_PET_COUNCIL,
    supply: SUPPLY_PET_HONORARY,
    gif: 'specific_honorary.gif',
    video: 'specific_honorary.mp4',
  },
  {
    for: SPECIFIC_PET_FOR_GUARDIAN,
    pet: SPECIFIC_NAME_PET_TOP10,
    supply: SUPPLY_PET_GUARDIAN,
    gif: 'specific_guardian.gif',
    video: 'specific_guardian.mp4',
  },
  {
    for: SPECIFIC_PET_FOR_JUDGE,
    pet: SPECIFIC_NAME_PET_JUDGE,
    supply: SUPPLY_PET_JUDGE,
    gif: 'specific_judge.gif',
    video: 'specific_judge.mp4',
  },
  {
    for: SPECIFIC_PET_FOR_TOP10,
    pet: SPECIFIC_NAME_PET_HONORARY,
    supply: SUPPLY_PET_TOP10,
    gif: 'specific_whale.gif',
    video: 'specific_whale.mp4',
  },
];

export const OG_PET_REGULAR_RARITY = [
  {
    pet: REG_NAME_PET_ROUGH_TIERS_1,
    percent: PERCENT_PET_ROUGH_TIERS_1,
    supply: SUPPLY_PET_ROUGH_TIERS_1,
    gif: `rough_1_${REG_NAME_PET_ROUGH_TIERS_1}.gif`,
    video: `rough_1_${REG_NAME_PET_ROUGH_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_ROUGH_TIERS_2,
    percent: PERCENT_PET_ROUGH_TIERS_2,
    supply: SUPPLY_PET_ROUGH_TIERS_2,
    gif: `rough_2_${REG_NAME_PET_ROUGH_TIERS_2}.gif`,
    video: `rough_2_${REG_NAME_PET_ROUGH_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_ROUGH_TIERS_3,
    percent: PERCENT_PET_ROUGH_TIERS_3,
    supply: SUPPLY_PET_ROUGH_TIERS_3,
    gif: `rough_3_${REG_NAME_PET_ROUGH_TIERS_3}.gif`,
    video: `rough_3_${REG_NAME_PET_ROUGH_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_CYBER_TIERS_1,
    percent: PERCENT_PET_CYBER_TIERS_1,
    supply: SUPPLY_PET_CYBER_TIERS_1,
    gif: `cyber_1_${REG_NAME_PET_CYBER_TIERS_1}.gif`,
    video: `cyber_1_${REG_NAME_PET_CYBER_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_CYBER_TIERS_2,
    percent: PERCENT_PET_CYBER_TIERS_2,
    supply: SUPPLY_PET_CYBER_TIERS_2,
    gif: `cyber_2_${REG_NAME_PET_CYBER_TIERS_2}.gif`,
    video: `cyber_2_${REG_NAME_PET_CYBER_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_CYBER_TIERS_3,
    percent: PERCENT_PET_CYBER_TIERS_3,
    supply: SUPPLY_PET_CYBER_TIERS_3,
    gif: `cyber_3_${REG_NAME_PET_CYBER_TIERS_3}.gif`,
    video: `cyber_3_${REG_NAME_PET_CYBER_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_MATRIX_TIERS_1,
    percent: PERCENT_PET_MATRIX_TIERS_1,
    supply: SUPPLY_PET_MATRIX_TIERS_1,
    gif: `matrix_1_${REG_NAME_PET_MATRIX_TIERS_1}.gif`,
    video: `matrix_1_${REG_NAME_PET_MATRIX_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_MATRIX_TIERS_2,
    percent: PERCENT_PET_MATRIX_TIERS_2,
    supply: SUPPLY_PET_MATRIX_TIERS_2,
    gif: `matrix_2_${REG_NAME_PET_MATRIX_TIERS_2}.gif`,
    video: `matrix_2_${REG_NAME_PET_MATRIX_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_MATRIX_TIERS_3,
    percent: PERCENT_PET_MATRIX_TIERS_3,
    supply: SUPPLY_PET_MATRIX_TIERS_3,
    gif: `matrix_3_${REG_NAME_PET_MATRIX_TIERS_3}.gif`,
    video: `matrix_3_${REG_NAME_PET_MATRIX_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_GOLDBOI_TIERS_1,
    percent: PERCENT_PET_GOLDBOI_TIERS_1,
    supply: SUPPLY_PET_GOLDBOI_TIERS_1,
    gif: `goldboi_1_${REG_NAME_PET_GOLDBOI_TIERS_1}.gif`,
    video: `goldboi_1_${REG_NAME_PET_GOLDBOI_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_GOLDBOI_TIERS_2,
    percent: PERCENT_PET_GOLDBOI_TIERS_2,
    supply: SUPPLY_PET_GOLDBOI_TIERS_2,
    gif: `goldboi_2_${REG_NAME_PET_GOLDBOI_TIERS_2}.gif`,
    video: `goldboi_2_${REG_NAME_PET_GOLDBOI_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_GOLDBOI_TIERS_3,
    percent: PERCENT_PET_GOLDBOI_TIERS_3,
    supply: SUPPLY_PET_GOLDBOI_TIERS_3,
    gif: `goldboi_3_${REG_NAME_PET_GOLDBOI_TIERS_3}.gif`,
    video: `goldboi_3_${REG_NAME_PET_GOLDBOI_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_ROBOTER_TIERS_1,
    percent: PERCENT_PET_ROBOTER_TIERS_1,
    supply: SUPPLY_PET_ROBOTER_TIERS_1,
    gif: `roboter_1_${REG_NAME_PET_ROBOTER_TIERS_1}.gif`,
    video: `roboter_1_${REG_NAME_PET_ROBOTER_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_ROBOTER_TIERS_2,
    percent: PERCENT_PET_ROBOTER_TIERS_2,
    supply: SUPPLY_PET_ROBOTER_TIERS_2,
    gif: `roboter_2_${REG_NAME_PET_ROBOTER_TIERS_2}.gif`,
    video: `roboter_2_${REG_NAME_PET_ROBOTER_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_ROBOTER_TIERS_3,
    percent: PERCENT_PET_ROBOTER_TIERS_3,
    supply: SUPPLY_PET_ROBOTER_TIERS_3,
    gif: `roboter_3_${REG_NAME_PET_ROBOTER_TIERS_3}.gif`,
    video: `roboter_3_${REG_NAME_PET_ROBOTER_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_BURNER_TIERS_1,
    percent: PERCENT_PET_BURNER_TIERS_1,
    supply: SUPPLY_PET_BURNER_TIERS_1,
    gif: `burner_1_${REG_NAME_PET_BURNER_TIERS_1}.gif`,
    video: `burner_1_${REG_NAME_PET_BURNER_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_BURNER_TIERS_2,
    percent: PERCENT_PET_BURNER_TIERS_2,
    supply: SUPPLY_PET_BURNER_TIERS_2,
    gif: `burner_2_${REG_NAME_PET_BURNER_TIERS_2}.gif`,
    video: `burner_2_${REG_NAME_PET_BURNER_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_BURNER_TIERS_3,
    percent: PERCENT_PET_BURNER_TIERS_3,
    supply: SUPPLY_PET_BURNER_TIERS_3,
    gif: `burner_3_${REG_NAME_PET_BURNER_TIERS_3}.gif`,
    video: `burner_3_${REG_NAME_PET_BURNER_TIERS_3}.mp4`,
  },
  {
    pet: REG_NAME_PET_CELESTIAL_TIERS_1,
    percent: PERCENT_PET_CELESTIAL_TIERS_1,
    supply: SUPPLY_PET_CELESTIAL_TIERS_1,
    gif: `celestial_1_${REG_NAME_PET_CELESTIAL_TIERS_1}.gif`,
    video: `celestial_1_${REG_NAME_PET_CELESTIAL_TIERS_1}.mp4`,
  },
  {
    pet: REG_NAME_PET_CELESTIAL_TIERS_2,
    percent: PERCENT_PET_CELESTIAL_TIERS_2,
    supply: SUPPLY_PET_CELESTIAL_TIERS_2,
    gif: `celestial_2_${REG_NAME_PET_CELESTIAL_TIERS_2}.gif`,
    video: `celestial_2_${REG_NAME_PET_CELESTIAL_TIERS_2}.mp4`,
  },
  {
    pet: REG_NAME_PET_CELESTIAL_TIERS_3,
    percent: PERCENT_PET_CELESTIAL_TIERS_3,
    supply: SUPPLY_PET_CELESTIAL_TIERS_3,
    gif: `celestial_3_${REG_NAME_PET_CELESTIAL_TIERS_3}.gif`,
    video: `celestial_3_${REG_NAME_PET_CELESTIAL_TIERS_3}.mp4`,
  },
];
