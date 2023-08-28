import { Injectable } from '@nestjs/common';
import { Host } from './models/enum/host.enum';

@Injectable()
export class AppService {
  getHandler(): string {
    return Host.FIRST_MESSAGE;
  }
}
