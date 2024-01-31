import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserActivationRequestDto {
  @IsOptional()
  details: string;
  @IsNotEmpty()
  male: string;
  @IsNotEmpty()
  female: string;
  @IsNotEmpty()
  lgtb: string;
  @IsNotEmpty()
  latitude: string;
  @IsNotEmpty()
  longitude: string;
  @IsNotEmpty()
  name: string;
  fileId: string;
  tokenFirebase: string;
}
