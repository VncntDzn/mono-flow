import { TransactionType } from '@/features/transactions/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  transactionId: string;

  @Column({ name: 'transaction_name' })
  transactionName: string;

  @ManyToOne(() => User, (userInfo) => userInfo.userId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: string;

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
