import { Test, TestingModule } from '@nestjs/testing';

import { SigninDTO, SignupDTO } from '../dto/auth.dto';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { HttpStatus } from '@nestjs/common';

const createUserDto: SignupDTO = {
  first_name: 'firstName #1',
  last_name: 'lastName #1',
  password: 'password',
  email: 'sample@gmail.com',
};

const signinUserDto: SigninDTO = {
  password: 'password',
  email: 'sample@gmail.com',
};
describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn().mockImplementation(() =>
              Promise.resolve({
                message: 'User created successfully',
                status: HttpStatus.CREATED,
              }),
            ),
            signin: jest.fn().mockImplementation(() =>
              Promise.resolve({
                status: HttpStatus.OK,
                message: 'Successfully signed in',
                include: {
                  access_token: 'access_token',
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should signup  a user', () => {
    authController.signup(createUserDto);

    expect(authController.signup(createUserDto)).resolves.toEqual({
      message: 'User created successfully',
      status: HttpStatus.CREATED,
    });
    expect(authService.signup).toHaveBeenCalledWith(createUserDto);
  });

  it('should signin  a user', () => {
    authController.signin(signinUserDto);
    expect(authService.signin).toHaveBeenCalledWith(signinUserDto);
  });
});
