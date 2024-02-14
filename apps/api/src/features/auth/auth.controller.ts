import { Public } from '@/constants';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto/auth.dto';
import { DB_CODES } from '@/common/enums/db';
import { ApiResponse } from '@/common/types';
import { ISigninWithToken } from './interfaces/signin.interface';

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() params: SignupDTO) {
    try {
      await this.authService.signup(params);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      console.log(error);
      if (error.code === DB_CODES.UNIQUE_VIOLATION) {
        throw new HttpException(
          'Email already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/signin')
  async signin(
    @Body() { email, password }: SigninDTO,
  ): Promise<ApiResponse<ISigninWithToken>> {
    try {
      const res = await this.authService.signin({
        email,
        password,
      });

      return {
        status: HttpStatus.OK,
        message: 'Successfully signed in',
        data: res,
      };
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }
}