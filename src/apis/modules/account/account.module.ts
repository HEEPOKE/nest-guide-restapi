import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  providers: [AccountService, PrismaService, ConfigService],
  controllers: [AccountController,],
  exports: [AccountService],
})
export class AccountModule {}
