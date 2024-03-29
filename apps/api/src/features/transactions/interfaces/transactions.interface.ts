import { TransactionType } from '../enums';

export interface ITransactions {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  time_created_at: string;
  is_recurring: boolean;
  transaction_name: string;
  user_id: string;
}
