import { IsNotEmpty } from 'class-validator';

export class ChangeLatLongDto {
  @IsNotEmpty()
  readonly latitude?: number;

  @IsNotEmpty()
  readonly longitude?: number;

  @IsNotEmpty()
  readonly idUserActivation?: string;
}
