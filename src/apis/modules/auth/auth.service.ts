import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { AccountService } from '../account/account.service';
import config from '../../../config/config';
import { RsaUtil } from '../../../utils/rsa';

@Injectable()
export class AuthService {
  private readonly revokedTokens = new Set<string>();
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
    private rsaUtil: RsaUtil,
  ) {}

  async signIn(authDto: AuthDto): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      const password = this.rsaUtil.decrypt(authDto.password);
      const user = await this.accountService.getAccountByEmail(authDto.email)
      Logger.log("getAccountByEmail for get have user : " + JSON.stringify(user));

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (this.rsaUtil.decrypt(user.password) !== password) {
        throw new BadRequestException("Invalid credentials");
      }

      return await this.getTokens(user);
    } catch (err) {
      console.error(`AuthService POST: apis/auth/signIn ${err}`);
      throw new BadRequestException(err);
    }
  }

  async signUp(authDto: AuthDto) {
    try {
      const savedAccount = await this.accountService.createAccount(authDto)

      return savedAccount;
    } catch (err) {
      Logger.error(`AuthService POST : apis/auth/signUp ${err}`);
      throw new BadRequestException(err);
    }
  }

  async getTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { payload },
        { secret: config.JWT_ACCESS_SECRET, expiresIn: '1d' },
      ),
      this.jwtService.signAsync(
        { payload },
        { secret: config.JWT_REFRESH_SECRET, expiresIn: '3d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.JWT_REFRESH_SECRET,
      });
      return await this.getTokens(payload);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  isTokenRevoked(token: string) {
    return this.revokedTokens.has(token);
  }

  signOut(accessToken: string) {
    this.revokedTokens.add(accessToken);
  }
}
