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
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column()
  transaction_name: string;

  @ManyToOne(() => User, (userInfo) => userInfo.user_id)
  @JoinColumn({
    foreignKeyConstraintName: 'user_id',
    referencedColumnName: 'user_id',
    name: 'user_id',
  })
  user_id: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  // TODO: need to know the category/wallet/account
  category: string;

  @Column({ default: TransactionType.INCOME })
  type:
    | TransactionType.INCOME
    | TransactionType.EXPENSE
    | TransactionType.SAVINGS;

  @Column({ default: false, name: 'is_recurring' })
  is_recurring: boolean;
}
