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
export class Wallets extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  wallet_id: string;

  @ManyToOne(() => User, (userInfo) => userInfo.user_id)
  @JoinColumn({
    foreignKeyConstraintName: 'user_id',
    referencedColumnName: 'user_id',
    name: 'user_id',
  })
  user_id: string;

  @Column()
  balance: number;

  @Column()
  name: string;

  // What kind of bank e.g Metrobank/UB/BPI
  @Column()
  provider: string;
}
