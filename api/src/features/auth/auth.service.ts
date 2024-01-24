import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ISignin, ISignup } from './interfaces/auth.interface';
import { User } from '@/entities/user.entity';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(params: ISignup) {
    return await this.userRepo.insert({
      ...params,
      time_created_at: DateTime.now() as unknown as string,
    });
  }
  async signin({ email, password }: ISignin) {
    const res = await this.userRepo.findOneOrFail({
      where: {
        email,
      },
    });
    const isPasswordMatched = await bcrypt.compare(password, res.password);

    if (isPasswordMatched) {
      const payload = { username: email };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
        email: res.email,
        last_name: res.last_name,
        first_name: res.first_name,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
