import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ISignin, ISignup } from '@shared/auth.types';
import { User } from '@/entities/user.entity';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup({ first_name, last_name, email, password }: ISignup) {
    const user = new User();
    Object.assign(user, {
      email,
      password,
      first_name,
      last_name,
    });
    return await this.userRepo.insert(user);
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
        last_name: res.last_name,
        first_name: res.first_name,
        user_id: res.user_id,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
