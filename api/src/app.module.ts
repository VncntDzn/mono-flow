import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 15,
        limit: 5,
      },
    ]),
    FeaturesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
