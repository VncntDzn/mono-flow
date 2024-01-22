import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../enums';
import { Transform } from 'class-transformer';

export class TransactionsDTO {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @Transform(({ value }) => ('' + value).toLowerCase())
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  time_created_at: string;

  @IsBoolean()
  is_recurring: boolean;

  @IsString()
  transaction_name: string;

  @IsString()
  user_id: string;
}
