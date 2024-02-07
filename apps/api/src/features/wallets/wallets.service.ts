import { Wallets } from '@/entities/wallets.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IWallet } from '@shared/wallet.type';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallets)
    private readonly repo: Repository<Wallets>,
  ) {}

  async getWallets(user_id: Wallets['user_id']): Promise<Wallets[]> {
    try {
      const res = await this.repo.find({
        where: {
          user_id,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
  async addWallet(param: IWallet): Promise<Wallets> {
    try {
      const wallet = new Wallets();
      Object.assign(wallet, param);

      return (await this.repo.insert(wallet)) as unknown as Promise<Wallets>;
    } catch (error) {
      return error;
    }
  }
  async updateWallet() {}
  async deleteWallet() {}
}
