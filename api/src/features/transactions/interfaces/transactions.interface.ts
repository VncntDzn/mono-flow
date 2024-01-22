import { TransactionType } from '../enums';

export interface ITransactions {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  timeCreatedAt: string;
  isRecurring: boolean;
  transactionName: string;
  userId: string;
}
