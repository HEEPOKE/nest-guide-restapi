import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../../../config/config';
import { JwtPayloadType } from '../../../../models/jwt/payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JwtPayloadType) {
    return payload;
  }
}
