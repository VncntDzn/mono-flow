import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import db from '@/configs/db';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    FeaturesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(db()),
    ThrottlerModule.forRoot([
      {
        ttl: 15,
        limit: 5,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
