import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { User } from '@/entities/user.entity';

const userArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

describe('Auth Service', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            signup: jest.fn().mockResolvedValue(userArray),
            signin: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Auth service tests', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        first_name: 'firstName #1',
        last_name: 'lastName #1',
        email: 'sample@gmail.com',
        password: 'password',
      };

      expect(
        service.signup({
          first_name: 'firstName #1',
          last_name: 'lastName #1',
          email: 'sample@gmail.com',
          password: 'password',
        }),
      ).resolves.toEqual(oneUser);
    });
  });
});
