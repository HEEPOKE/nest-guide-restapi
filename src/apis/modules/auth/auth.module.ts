import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AccountModule } from '../account/account.module';
import { RsaUtil } from '../../../utils/rsa';

@Module({
  imports: [
    JwtModule.register({}),
    RsaUtil,
    AccountModule, 
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
