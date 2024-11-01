import { IsNotEmpty } from 'class-validator';

export class LandWishCreateDto {
  @IsNotEmpty()
  landId: number;

  @IsNotEmpty()
  quantity: number;
}
