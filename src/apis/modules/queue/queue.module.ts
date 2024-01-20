import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueueName } from '../../../constants/queue';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: QueueName.MAIN,
      prefix: 'main',
      limiter: { max: 100, duration: 60000 },
      defaultJobOptions: { attempts: 1, backoff: 3000, delay: 2000 },
    }),
    MainModule,
  ],
})
export class QueueModule {}
