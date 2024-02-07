import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WalletsModule } from './wallets/wallets.module';
@Module({
  imports: [AuthModule, TransactionsModule, WalletsModule],
  providers: [],
})
export class FeaturesModule {}
