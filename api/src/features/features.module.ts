import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
@Module({
  imports: [AuthModule, TransactionsModule],
  providers: [],
})
export class FeaturesModule {}
