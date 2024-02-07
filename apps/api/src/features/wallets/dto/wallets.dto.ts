import { IsNumber, IsString } from 'class-validator';

export class WalletsDTO {
  @IsString()
  name: string;

  @IsNumber()
  balance: number;

  @IsString()
  provider: string;

  @IsString()
  user_id: string;
}
