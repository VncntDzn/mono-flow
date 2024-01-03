import { User } from '@/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ISignin, ISignup } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup({ email, password, first_name, last_name }: ISignup) {
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
      const payload = { sub: res.uid, username: email };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        access_token,
        user_email: res.email,
        last_name: res.last_name,
        first_name: res.first_name,
        uid: res.uid,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
