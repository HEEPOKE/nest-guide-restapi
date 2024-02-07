import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AccountModule } from '../account/account.module';
import { RsaUtil } from '../../../utils/rsa';
import { ApiKeyStrategy } from './strategy/apiKey.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          algorithm: 'HS512',
          expiresIn: configService.get<string>('EXPIRE_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    RsaUtil,
    AccountModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ApiKeyStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
