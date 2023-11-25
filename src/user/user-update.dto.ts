import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  designation: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
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
}
