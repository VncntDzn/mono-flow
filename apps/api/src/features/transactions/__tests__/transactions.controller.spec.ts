import { Test, TestingModule } from '@nestjs/testing';

import { HttpStatus } from '@nestjs/common';
import { TransactionsDTO } from '../dto/transactions.dto';
import { TransactionType } from '../enums';
import { TransactionsController } from '../transactions.controller';
import { TransactionsService } from '../transactions.service';

const transactions = [
  {
    transaction_name: 'transaction_name #1',
    user_id: 'user_id #1',
    description: 'description #1',
    amount: 100,
    category: 'category #1',
    type: TransactionType.INCOME,
    is_recurring: false,
    time_created_at: 'Jan 25, 2024',
  },
  {
    transaction_name: 'transaction_name #2',
    user_id: 'user_id #2',
    description: 'description #2',
    amount: 200,
    category: 'category #2',
    type: TransactionType.INCOME,
    is_recurring: false,
    time_created_at: 'Jan 25, 2024',
  },
];
describe('Transactions Controller', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: TransactionsService,
          useValue: {
            getTransactions: jest.fn().mockImplementation(() =>
              Promise.resolve({
                status: HttpStatus.OK,
                message: 'Successfully retrieved data',
                data: transactions,
              }),
            ),
            getTransaction: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                staus: HttpStatus.OK,
                message: 'Successfully retrieved data',
                data: transactions[0],
                id,
              }),
            ),
            addTransaction: jest
              .fn()
              .mockImplementation((transaction: TransactionsDTO) =>
                Promise.resolve({
                  status: HttpStatus.CREATED,
                  message: 'Transaction added successfully',
                }),
              ),
            updateTransaction: jest
              .fn()
              .mockImplementation((id: string, transaction: TransactionsDTO) =>
                Promise.resolve({
                  status: HttpStatus.OK,
                  message: 'Transaction updated successfully',
                }),
              ),
            deleteTransaction: jest.fn().mockImplementation(() =>
              Promise.resolve({
                status: HttpStatus.OK,
                message: 'Transaction deleted successfully',
              }),
            ),
          },
        },
      ],
    }).compile();

    transactionsController = app.get<TransactionsController>(
      TransactionsController,
    );
    transactionsService = app.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(transactionsController).toBeDefined();
  });

  it('should retrieve transactions', async () => {
    await expect(
      transactionsController.getTransactions(),
    ).resolves.toBeTruthy();
  });
  it('should retrieve a single transaction', async () => {
    await expect(
      transactionsController.getTransaction('1'),
    ).resolves.toBeTruthy();
  });
  it('should create a new transaction', async () => {
    await expect(
      transactionsController.addTransaction(transactions[0]),
    ).resolves.toEqual({
      status: HttpStatus.CREATED,
      message: 'Transaction added successfully',
    });
  });
  it('should update transaction', async () => {
    await expect(
      transactionsController.updateTransaction('1', transactions[0]),
    ).resolves.toEqual({
      status: HttpStatus.OK,
      message: 'Transaction updated successfully',
    });
  });
  it('should delete a transaction', async () => {
    await expect(
      transactionsController.deleteTransaction('1'),
    ).resolves.toEqual({
      status: HttpStatus.OK,
      message: 'Transaction deleted successfully',
    });
  });
});
