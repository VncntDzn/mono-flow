import { Transactions } from '@/entities/transactions.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
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
    try {
      // this is just like this: https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.service.ts#L15
      const transaction = this.transactionRepo.insert(params);

      console.log(transaction);
      return transaction as unknown as Promise<Transactions>;
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateTransaction() {
    return 'x';
  }
  async deleteTransaction() {
    return 'x';
  }
}
