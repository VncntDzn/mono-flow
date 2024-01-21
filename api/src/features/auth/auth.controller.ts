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

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() { email, password, first_name, last_name }: SignupDTO) {
    try {
      await this.authService.signup({
        email,
        password,
        first_name,
        last_name,
      });
      return 'success';
    } catch (error) {
      console.log(error)
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
  async signin(@Body() { email, password }: SigninDTO) {
    try {
      const {
        access_token,
        first_name,
        last_name,
        email: user_email,
      } = await this.authService.signin({
        email,
        password,
      });

      return {
        access_token,
        user: {
          first_name,
          last_name,
          user_email,
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }
}
