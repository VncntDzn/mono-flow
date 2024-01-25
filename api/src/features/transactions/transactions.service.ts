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

  async getTransactions(): Promise<Transactions[]> {
    const res = await this.transactionRepo.find();
    return res;
  }
  async getTransaction(id: string): Promise<Transactions> {
    const res: Transactions = await this.transactionRepo.findOneOrFail({
      where: { transaction_id: id },
    });
    return res;
  }

  async addTransaction(params: ITransactions): Promise<Transactions> {
    try {
      // this is just like this: https://github.com/nestjs/nest/blob/master/sample/05-sql-typeorm/src/users/users.service.ts#L15
      const transaction = this.transactionRepo.insert(params);

      return transaction as unknown as Promise<Transactions>;
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateTransaction(id: string, params: ITransactions) {
    const res = await this.transactionRepo.update(
      { transaction_id: id },
      params,
    );
    return res;
  }
  async deleteTransaction(id: string) {
    const res = await this.transactionRepo.delete({ transaction_id: id });
    return res;
  }
}
