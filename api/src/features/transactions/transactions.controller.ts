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
    return {
      status: HttpStatus.OK,
      message: 'Successfully retrieved data',
      data: res,
    };
  }

  @Get(':id')
  async getTransaction(
    @Param('id') id: string,
  ): Promise<ApiResponse<Transactions>> {
    const res = await this.transactionsService.getTransaction(id);
    return {
      status: HttpStatus.OK,
      message: 'Successfully retrieved data',
      data: res,
    };
  }

  @Post()
  async addTransaction(
    @Body()
    params: TransactionsDTO,
  ): Promise<ApiResponse<Transactions>> {
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
  ): Promise<ApiResponse<Transactions>> {
    try {
      await this.transactionsService.updateTransaction(id, params);
      return {
        status: HttpStatus.OK,
        message: 'Transaction updated successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      await this.transactionsService.deleteTransaction(id);
      return {
        status: HttpStatus.OK,
        message: 'Transaction deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
