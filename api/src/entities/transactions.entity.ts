import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Transactions extends BaseEntity {
  @Column()
  transactionName: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  // TODO: need to know the category/wallet/account
  category: string;

  @Column()
  // TODO: need to know the category
  type: 'income' | 'expense' | 'savings';

  @Column({ default: false })
  recurringTransactions: boolean;
}
