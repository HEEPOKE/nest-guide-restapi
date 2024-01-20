import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  async processMainJob(job: any) {
    console.log('processMainJob', job);
  }
}
