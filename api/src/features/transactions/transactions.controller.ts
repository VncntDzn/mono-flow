import { Public } from '@/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsDTO } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';
import { ApiResponse } from '@/common/types';
import { Transactions } from '@/entities/transactions.entity';

@Public()
@Controller('/transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactions(): Promise<ApiResponse<Transactions[]>> {
    const res = await this.transactionsService.getTransactions();
    return { data: res };
  }
  @Get(':id')
  getTransaction() {
    return 'Hi';
  }

  @Post()
  async addTransaction(
    @Body()
    {
      transaction_name,
      time_created_at,
      amount,
      category,
      description,
      is_recurring,
      type,
      user_id,
    }: TransactionsDTO,
  ) {
    try {
      // todo: think about date since user can choose whenever instead of adding it using base entity
      await this.transactionsService.addTransaction({
        transactionName: transaction_name,
        timeCreatedAt: time_created_at,
        amount,
        category,
        description,
        isRecurring: is_recurring,
        type,
        userId: user_id,
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Transaction added successfully',
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  updateTransaction() {
    return 'Hi';
  }

  @Delete(':id')
  deleteTransaction() {
    return 'Hi';
  }
}
