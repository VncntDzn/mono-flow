import { Wallets } from '@/entities/wallets.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallets])],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
