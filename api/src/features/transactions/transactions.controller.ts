import { ApiResponse } from '@/common/types';
import { Public } from '@/constants';
import { Transactions } from '@/entities/transactions.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
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
  async getTransactions(): Promise<ApiResponse<Transactions[]>> {
    const res = await this.transactionsService.getTransactions();
    return { data: res };
  }

  @Get(':id')
  async getTransaction(
    @Param('id') id: string,
  ): Promise<ApiResponse<Transactions>> {
    const res = await this.transactionsService.getTransaction(id);
    return {
      data: res,
    };
  }

  @Post()
  async addTransaction(
    @Body()
    params: TransactionsDTO,
  ) {
    try {
      await this.transactionsService.addTransaction(params);
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

  @Put(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body()
    params: TransactionsDTO,
  ): Promise<ApiResponse<any>> {
    try {
      const res = await this.transactionsService.updateTransaction(id, params);
      return { data: res };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  deleteTransaction() {
    return 'Hi';
  }
}
