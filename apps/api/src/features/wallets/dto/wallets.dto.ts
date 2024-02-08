import { IsNumberString, IsString } from 'class-validator';

export class WalletsDTO {
  @IsString()
  name: string;

  @IsNumberString()
  balance: number;

  @IsString()
  provider: string;

  @IsString()
  user_id: string;
}
