import { Public } from '@/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsDTO } from './dto/transactions.dto';
import { TransactionsService } from './transactions.service';

@Public()
@Controller('/transactions')
export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name);
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions() {
    return 'Hi';
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
      date,
      amount,
      category,
      description,
      is_recurring,
      type,
    }: TransactionsDTO,
  ) {
    // todo: think about date since user can choose whenever instead of adding it using base entity
    const res = await this.transactionsService.addTransaction({
      transactionName: transaction_name,
      date,
      amount,
      category,
      description,
      isRecurring: is_recurring,
      type,
    });

    return res;
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
