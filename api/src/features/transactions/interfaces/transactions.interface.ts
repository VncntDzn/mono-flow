import { TransactionType } from '../enums';

export interface ITransactions {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string;
  isRecurring: boolean;
  transactionName: string;
}
