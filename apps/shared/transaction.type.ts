export const ITransactionType = {
  INCOME: "income",
  EXPENSE: "expense",
  SAVINGS: "savings",
} as const;

export interface ITransactions {
  amount: number;
  description: string;
  category: string;
  type:
    | typeof ITransactionType.EXPENSE
    | typeof ITransactionType.INCOME
    | typeof ITransactionType.SAVINGS
    | undefined;
  time_created_at: string;
  is_recurring: boolean;
  transaction_name: string;
  user_id: string;
}
