import { Injectable } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueName, QueueJob } from '../../../../constants/queue';
import { MainService } from './main.service';

@Processor(QueueName.MAIN)
@Injectable()
export class MainConsumer {
  constructor(private readonly mainService: MainService) {}

  @Process(QueueJob.MAIN)
  async processMainJob(job: Job) {
    await this.mainService.processMainJob(job);
  }
}
