import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { JwtAuthGuard } from './modules/auth/guards/jwtAccessGuard';
import { UtilitiesModule } from './modules/utilities/utilities.module';

@Module({
  imports: [PrismaModule, AuthModule, AccountModule, UtilitiesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApisModule {}
