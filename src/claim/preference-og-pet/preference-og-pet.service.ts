import { Injectable } from '@nestjs/common';

export const PREFERENCE_MINT = 'mint';
export const PREFERENCE_OG = 'og';
export const PREFERENCE_GUARDIAN = 'guardian';
export const PREFERENCE_JUDGE = 'judge';
export const PREFERENCE_COUNCIL = 'council';
export const PREFERENCE_WHALE = 'whale';
export const PREFERENCE_HONORARY = 'honorary';

@Injectable()
export class PreferenceOgPetService {}
