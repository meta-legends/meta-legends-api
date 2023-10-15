import { PINATA_URL } from '@src/enum/pinata-uri';

export const REG_NAME_DRONE_CELESTIAL = 'Celestial drone';
export const REG_NAME_DRONE_BURNER = 'Burner drone';
export const REG_NAME_DRONE_ROBOTER = 'Roboter drone';
export const REG_NAME_DRONE_GOLDBOI = 'Goldboi drone';
export const REG_NAME_DRONE_MATRIX_ANGEL = 'Matrix-Angel drone';
export const REG_NAME_DRONE_CYBER = 'Cyber drone';
export const REG_NAME_DRONE_ROUGH = 'Rough drone';

export const CODE_DRONE_CELESTIAL = 'drone-celestial';
export const CODE_DRONE_BURNER = 'drone-burner';
export const CODE_DRONE_ROBOTER = 'drone-roboter';
export const CODE_DRONE_GOLDBOI = 'drone-goldboi';
export const CODE_DRONE_MATRIX_ANGEL = 'drone-matrix-angel';
export const CODE_DRONE_CYBER = 'drone-cyber';
export const CODE_DRONE_ROUGH = 'drone-rough';

export const PERCENT_DRONE_CELESTIAL = 2;
export const PERCENT_DRONE_BURNER = 3;
export const PERCENT_DRONE_ROBOTER = 5;
export const PERCENT_DRONE_GOLDBOI = 8;
export const PERCENT_DRONE_MATRIX_ANGEL = 16;
export const PERCENT_DRONE_CYBER = 31;
export const PERCENT_DRONE_ROUGH = 35;

export const SUPPLY_DRONE_CELESTIAL = 108;
export const SUPPLY_DRONE_BURNER = 163;
export const SUPPLY_DRONE_ROBOTER = 271;
export const SUPPLY_DRONE_GOLDBOI = 434;
export const SUPPLY_DRONE_MATRIX_ANGEL = 869;
export const SUPPLY_DRONE_CYBER = 1684;
export const SUPPLY_DRONE_ROUGH = 1903;

export const HEALING_DRONE_CODE = 'healing-drone';
export const HEALING_DRONE_NAME = 'Healing drone';
export const HEALING_DRONE_FILE_DRAWING = `${HEALING_DRONE_CODE}.csv`;
export const HEALING_DRONE_DESCRIPTION =
  'This NFT represents a Healing drone whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends';
export const HEALING_DRONE_CID =
  'QmZrqpzNi3GqdpqhyRfbeSaLx5Fs4i36K5vjZRAbUpM5ah';
export const HEALING_DRONE_URL_IMAGE = `${PINATA_URL}/${HEALING_DRONE_CID}/gif`;
export const HEALING_DRONE_URL_ANIMATION = `${PINATA_URL}/${HEALING_DRONE_CID}/mp4`;
export const HEALING_DRONE_SUPPLY = 5432;
export const HEALING_DRONE_SUPPLY_DETAIL = [
  {
    name: REG_NAME_DRONE_CELESTIAL,
    code: CODE_DRONE_CELESTIAL,
    percent: PERCENT_DRONE_CELESTIAL,
    supply: SUPPLY_DRONE_CELESTIAL,
  },
  {
    name: REG_NAME_DRONE_BURNER,
    code: CODE_DRONE_BURNER,
    percent: PERCENT_DRONE_BURNER,
    supply: SUPPLY_DRONE_BURNER,
  },
  {
    name: REG_NAME_DRONE_ROBOTER,
    code: CODE_DRONE_ROBOTER,
    percent: PERCENT_DRONE_ROBOTER,
    supply: SUPPLY_DRONE_ROBOTER,
  },
  {
    name: REG_NAME_DRONE_GOLDBOI,
    code: CODE_DRONE_GOLDBOI,
    percent: PERCENT_DRONE_GOLDBOI,
    supply: SUPPLY_DRONE_GOLDBOI,
  },
  {
    name: REG_NAME_DRONE_MATRIX_ANGEL,
    code: CODE_DRONE_MATRIX_ANGEL,
    percent: PERCENT_DRONE_MATRIX_ANGEL,
    supply: SUPPLY_DRONE_MATRIX_ANGEL,
  },
  {
    name: REG_NAME_DRONE_CYBER,
    code: CODE_DRONE_CYBER,
    percent: PERCENT_DRONE_CYBER,
    supply: SUPPLY_DRONE_CYBER,
  },
  {
    name: REG_NAME_DRONE_ROUGH,
    code: CODE_DRONE_ROUGH,
    percent: PERCENT_DRONE_ROUGH,
    supply: SUPPLY_DRONE_ROUGH,
  },
];
export const HEALING_DRONE_METADATA = {
  [CODE_DRONE_CELESTIAL]: [
    {
      trait_type: 'Class',
      value: 'Celestial',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_BURNER]: [
    {
      trait_type: 'Class',
      value: 'Burner',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_ROBOTER]: [
    {
      trait_type: 'Class',
      value: 'Roboter',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_GOLDBOI]: [
    {
      trait_type: 'Class',
      value: 'Goldboi',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_MATRIX_ANGEL]: [
    {
      trait_type: 'Class',
      value: 'Matrix-Angel',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_CYBER]: [
    {
      trait_type: 'Class',
      value: 'Cyber',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
  [CODE_DRONE_ROUGH]: [
    {
      trait_type: 'Class',
      value: 'Rough',
    },
    {
      trait_type: 'Item',
      value: 'Healing drone',
    },
  ],
};
