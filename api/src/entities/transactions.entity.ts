import { TransactionType } from '@/features/transactions/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  transactionId: string;

  @Column({ name: 'transaction_name' })
  transactionName: string;

  @Column({ name: 'date' })
  date: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'category' })
  // TODO: need to know the category/wallet/account
  category: string;

  @Column({ default: TransactionType.INCOME, name: 'type' })
  type:
    | TransactionType.INCOME
    | TransactionType.EXPENSE
    | TransactionType.SAVINGS;

  @Column({ default: false, name: 'is_recurring' })
  isRecurring: boolean;
}
