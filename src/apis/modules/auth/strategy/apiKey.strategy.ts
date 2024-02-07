import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { config } from '../../../../config/config';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor() {
    super(
      { header: 'api-key', prefix: '' },
      true,
      async (apiKey: string, done) => {
        if (apiKey === config.API_KEY) {
          done(null, true);
        }
        console.log(config.API_KEY);
        
        done(new UnauthorizedException());
      },
    );
  }
}
