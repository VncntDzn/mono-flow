import { Transactions } from '@/entities/transactions.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsDTO } from '../dto/transactions.dto';
import { TransactionType } from '../enums';
import { TransactionsService } from '../transactions.service';

const transactions: TransactionsDTO[] = [
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

const oneTransaction = {
  transaction_name: 'transaction_name #1',
  user_id: 'user_id #1',
  description: 'description #1',
  amount: 100,
  category: 'category #1',
  type: TransactionType.INCOME,
  is_recurring: false,
  time_created_at: 'Jan 25, 2024',
};

describe('Transactions Service', () => {
  let service: TransactionsService;
  let repository: Repository<Transactions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transactions),
          useValue: {
            find: jest.fn().mockResolvedValue(transactions),
            findOneOrFail: jest.fn().mockResolvedValue(oneTransaction),
            insert: jest.fn().mockResolvedValue(oneTransaction),
            update: jest.fn().mockResolvedValue(oneTransaction),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<Repository<Transactions>>(
      getRepositoryToken(Transactions),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Transactions service tests', () => {
    it('should fetch all transactions', async () => {
      const res = await service.getTransactions();
      expect(res).toEqual(transactions);
    });
    it('should fetch one transaction', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneOrFail');

      expect(service.getTransaction('1')).resolves.toEqual(oneTransaction);
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
    it('should add one transaction', async () => {
      const repoSpy = jest.spyOn(repository, 'insert');

      expect(
        service.addTransaction({
          transaction_name: 'transaction_name #1',
          user_id: 'user_id #1',
          description: 'description #1',
          amount: 100,
          category: 'category #1',
          type: TransactionType.INCOME,
          is_recurring: false,
          time_created_at: 'Jan 25, 2024',
        }),
      ).resolves.toEqual(oneTransaction);
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it('should update one transaction', async () => {
      const repoSpy = jest.spyOn(repository, 'update');

      const res = await service.updateTransaction('1', {
        transaction_name: 'transaction_name #1',
        user_id: 'user_id #1',
        description: 'description #1',
        amount: 100,
        category: 'category #1',
        type: TransactionType.INCOME,
        is_recurring: false,
        time_created_at: 'Jan 25, 2024',
      });
      expect(res).toEqual(oneTransaction);

      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(
        {
          transaction_id: '1',
        },
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
      );
    });

    it('should delete one transaction', async () => {
      expect(service.deleteTransaction('1')).resolves.toEqual(true);
    });
  });
});
