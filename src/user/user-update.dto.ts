import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  firstname: string;

  @IsOptional()
  wallet: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  designation: string;

  @IsOptional()
  web3Profil: string;

  @IsOptional()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  profilePicture: string;

  @IsOptional()
  linkedin: string;

  @IsOptional()
  twitter: string;

  @IsOptional()
  discord: string;

  @IsOptional()
  instagram: string;
}
