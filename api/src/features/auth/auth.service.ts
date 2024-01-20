import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ISignin, ISignup } from './interfaces/auth.interface';
import { UserEntity } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup({ email, password, first_name, last_name }: ISignup) {
    const user = new UserEntity();
    Object.assign(user, {
      email,
      password,
      firstName: first_name,
      lastName: last_name,
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
        email: res.email,
        last_name: res.lastName,
        first_name: res.firstName,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
