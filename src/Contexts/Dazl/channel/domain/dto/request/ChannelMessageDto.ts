import { IsNotEmpty } from 'class-validator';

export class ChannelMessageDto {
  @IsNotEmpty()
  start: number;
  @IsNotEmpty()
  end: number;
}
