import { Public } from '@/constants';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WalletsDTO } from './dto/wallets.dto';
import { WalletsService } from './wallets.service';
import { ApiResponse } from '@/common/types';
import { Wallets } from '@/entities/wallets.entity';

@Public()
@Controller('/wallets')
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @Get(':user_id')
  async getWallets(
    @Param('user_id') user_id: string,
  ): Promise<ApiResponse<Wallets[]>> {
    const res = await this.service.getWallets(user_id);
    return {
      status: HttpStatus.OK,
      message: 'Successfully retrieved data',
      data: res,
    };
  }

  @Post()
  async addWallet(
    @Body() { name, balance, provider, user_id }: WalletsDTO,
  ): Promise<ApiResponse<Wallets>> {
    await this.service.addWallet({
      name,
      balance,
      provider,
      user_id,
    });
    return {
      status: HttpStatus.CREATED,
      message: 'Wallet created successfully',
    };
  }

  @Put(':id')
  async updateWallet() {
    return {
      status: HttpStatus.OK,
      message: 'Wallet updated successfully',
    };
  }
  @Delete(':id')
  async deleteWallet() {
    return {
      status: HttpStatus.OK,
      message: 'Wallet deleted successfully',
    };
  }
}
