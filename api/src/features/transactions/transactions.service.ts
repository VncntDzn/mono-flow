import { Transactions } from '@/entities/transactions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransactions } from './interfaces/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
  ) {}

  async getTransactions() {
    return 'x';
  }
  async getTransaction() {
    return 'x';
  }

  async addTransaction(params: ITransactions): Promise<Transactions> {
    // this is just like this: https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.service.ts#L15
    const entity = {
      ...params,
      user_id: 'XX',
      timeCreatedAt: 'Today',
    };
    const transaction = this.transactionRepo.insert(entity);
    return transaction as unknown as Promise<Transactions>;
  }

  async updateTransaction() {
    return 'x';
  }
  async deleteTransaction() {
    return 'x';
  }
}
