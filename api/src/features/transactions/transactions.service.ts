import { TransactionsEntity } from '@/entities/transactions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransactions } from './interfaces/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private transactionRepo: Repository<TransactionsEntity>,
  ) {}

  async getTransactions() {
    return 'x';
  }
  async getTransaction() {
    return 'x';
  }

  async addTransaction(params: ITransactions) {
    return params;
  }

  async updateTransaction() {
    return 'x';
  }
  async deleteTransaction() {
    return 'x';
  }
}
