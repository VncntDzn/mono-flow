import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TransactionType } from '@/features/transactions/enums';

@Entity()
export class TransactionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  transactionId: string;

  @ManyToOne(() => UserEntity, (user) => user.userId)
  // Added name since it's a foreign key
  //need to do something
  @Column({ name: 'user_id', foreignKeyConstraintName: 'user_id_fk' })
  userId: string;

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

  @Column({ default: TransactionType.INCOME })
  type:
    | TransactionType.INCOME
    | TransactionType.EXPENSE
    | TransactionType.SAVINGS;

  @Column({ default: false, name: 'is_recurring' })
  isRecurring: boolean;
}
