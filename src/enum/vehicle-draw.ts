import { PINATA_URL } from '@src/enum/pinata-uri';

export const VEHICLE_CELESTIAL_REG_NAME = 'Celestial Speedster';
export const VEHICLE_CELESTIAL_CODE = 'celestial-speedster';
export const VEHICLE_CELESTIAL_PERCENT = 7;
export const VEHICLE_CELESTIAL_SUPPLY = 57;

export const VEHICLE_BURNER_REG_NAME = 'Burner Speed Tank';
export const VEHICLE_BURNER_CODE = 'burner-speed-tank';
export const VEHICLE_BURNER_PERCENT = 9;
export const VEHICLE_BURNER_SUPPLY = 74;

export const VEHICLE_ROBOTER_REG_NAME = 'Roboter HoverTank';
export const VEHICLE_ROBOTER_CODE = 'roboter-hovertank';
export const VEHICLE_ROBOTER_PERCENT = 11;
export const VEHICLE_ROBOTER_SUPPLY = 90;

export const VEHICLE_GOLDBOI_REG_NAME = 'Goldboi Tank';
export const VEHICLE_GOLDBOI_CODE = 'goldboi-tank';
export const VEHICLE_GOLDBOI_PERCENT = 13;
export const VEHICLE_GOLDBOI_SUPPLY = 107;

export const VEHICLE_MATRIX_REG_NAME = 'Matrix Racing Car';
export const VEHICLE_MATRIX_CODE = 'matrix-racing-car';
export const VEHICLE_MATRIX_PERCENT = 17;
export const VEHICLE_MATRIX_SUPPLY = 140;

export const VEHICLE_CYBER_REG_NAME = 'Cyber Bike';
export const VEHICLE_CYBER_CODE = 'cyber-bike';
export const VEHICLE_CYBER_PERCENT = 20;
export const VEHICLE_CYBER_SUPPLY = 164;

export const VEHICLE_ROUGH_REG_NAME = 'Rough Buggy';
export const VEHICLE_ROUGH_CODE = 'rough-buggy';
export const VEHICLE_ROUGH_PERCENT = 23;
export const VEHICLE_ROUGH_SUPPLY = 189;

export const VEHICLE_COUNCIL_REG_NAME = 'Roboter HoverTank Council';
export const VEHICLE_COUNCIL_CODE = 'roboter-hovertank-council';
export const VEHICLE_COUNCIL_SUPPLY = 250;

export const VEHICLE_HONORARY_REG_NAME = 'Burner Speed Tank Honorary';
export const VEHICLE_HONORARY_CODE = 'burner-speed-tank-honorary';
export const VEHICLE_HONORARY_SUPPLY = 66;

export const VEHICLE_WHALE_REG_NAME = 'Celestial Speedster Whale';
export const VEHICLE_WHALE_CODE = 'celestial-speedster-whale';
export const VEHICLE_WHALE_SUPPLY = 31;

export const VEHICLE_GUARDIAN_REG_NAME = 'Goldboi Tank Guardian';
export const VEHICLE_GUARDIAN_CODE = 'goldboi-tank-guardian';
export const VEHICLE_GUARDIAN_SUPPLY = 22;

export const VEHICLE_JUDGE_REG_NAME = 'Cyber Bike Judge';
export const VEHICLE_JUDGE_CODE = 'cyber-bike-judge';
export const VEHICLE_JUDGE_SUPPLY = 10;

export const VEHICLE_NAME = 'OG Vehicle';
export const VEHICLE_CODE = 'og-vehicle';
export const VEHICLE_FILE_DRAWING = `${VEHICLE_CODE}.csv`;
export const VEHICLE_DESCRIPTION =
  'This NFT represents an OG Vehicle whose abilities will be at their full potential in Meta Life, the metaverse by Meta Legends';
export const VEHICLE_CID = 'QmfEaKN1rSCdFQYV4jDPApjWhcLykUMA5hT9nJGxrZbLHQ';
export const VEHICLE_URL_IMAGE = `${PINATA_URL}/${VEHICLE_CID}/gif`;
export const VEHICLE_URL_ANIMATION = `${PINATA_URL}/${VEHICLE_CID}/mp4`;
export const VEHICLE_SUPPLY = 821;
export const VEHICLE_SUPPLY_DETAIL = [
  {
    name: VEHICLE_CELESTIAL_REG_NAME,
    code: VEHICLE_CELESTIAL_CODE,
    percent: VEHICLE_CELESTIAL_PERCENT,
    supply: VEHICLE_CELESTIAL_SUPPLY,
  },
  {
    name: VEHICLE_BURNER_REG_NAME,
    code: VEHICLE_BURNER_CODE,
    percent: VEHICLE_BURNER_PERCENT,
    supply: VEHICLE_BURNER_SUPPLY,
  },
  {
    name: VEHICLE_ROBOTER_REG_NAME,
    code: VEHICLE_ROBOTER_CODE,
    percent: VEHICLE_ROBOTER_PERCENT,
    supply: VEHICLE_ROBOTER_SUPPLY,
  },
  {
    name: VEHICLE_GOLDBOI_REG_NAME,
    code: VEHICLE_GOLDBOI_CODE,
    percent: VEHICLE_GOLDBOI_PERCENT,
    supply: VEHICLE_GOLDBOI_SUPPLY,
  },
  {
    name: VEHICLE_MATRIX_REG_NAME,
    code: VEHICLE_MATRIX_CODE,
    percent: VEHICLE_MATRIX_PERCENT,
    supply: VEHICLE_MATRIX_SUPPLY,
  },
  {
    name: VEHICLE_CYBER_REG_NAME,
    code: VEHICLE_CYBER_CODE,
    percent: VEHICLE_CYBER_PERCENT,
    supply: VEHICLE_CYBER_SUPPLY,
  },
  {
    name: VEHICLE_ROUGH_REG_NAME,
    code: VEHICLE_ROUGH_CODE,
    percent: VEHICLE_ROUGH_PERCENT,
    supply: VEHICLE_ROUGH_SUPPLY,
  },
];

export const VEHICLE_METADATA = {
  [VEHICLE_CELESTIAL_CODE]: [
    {
      trait_type: 'Class',
      value: 'Celestial',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_CELESTIAL_REG_NAME,
    },
  ],
  [VEHICLE_BURNER_CODE]: [
    {
      trait_type: 'Class',
      value: 'Burner',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_BURNER_REG_NAME,
    },
  ],
  [VEHICLE_ROBOTER_CODE]: [
    {
      trait_type: 'Class',
      value: 'Roboter',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_ROBOTER_REG_NAME,
    },
  ],
  [VEHICLE_GOLDBOI_CODE]: [
    {
      trait_type: 'Class',
      value: 'Goldboi',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_GOLDBOI_REG_NAME,
    },
  ],
  [VEHICLE_MATRIX_CODE]: [
    {
      trait_type: 'Class',
      value: 'Matrix-Angel',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_MATRIX_REG_NAME,
    },
  ],
  [VEHICLE_CYBER_CODE]: [
    {
      trait_type: 'Class',
      value: 'Cyber',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_CYBER_REG_NAME,
    },
  ],
  [VEHICLE_ROUGH_CODE]: [
    {
      trait_type: 'Class',
      value: 'Rough',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_ROUGH_REG_NAME,
    },
  ],
  [VEHICLE_COUNCIL_CODE]: [
    {
      trait_type: 'Class',
      value: 'Roboter',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_COUNCIL_REG_NAME,
    },
  ],
  [VEHICLE_JUDGE_CODE]: [
    {
      trait_type: 'Class',
      value: 'Cyber',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_JUDGE_REG_NAME,
    },
  ],
  [VEHICLE_GUARDIAN_CODE]: [
    {
      trait_type: 'Class',
      value: 'Goldboi',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_GUARDIAN_REG_NAME,
    },
  ],
  [VEHICLE_WHALE_CODE]: [
    {
      trait_type: 'Class',
      value: 'Celestial',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_WHALE_REG_NAME,
    },
  ],
  [VEHICLE_HONORARY_CODE]: [
    {
      trait_type: 'Class',
      value: 'Burner',
    },
    {
      trait_type: 'Name',
      value: VEHICLE_HONORARY_REG_NAME,
    },
  ],
};
