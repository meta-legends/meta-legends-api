import { IsNotEmpty } from 'class-validator';

export class LandMintedCreateDto {
  @IsNotEmpty()
  landId: number;

  @IsNotEmpty()
  tokenId: number;
}
