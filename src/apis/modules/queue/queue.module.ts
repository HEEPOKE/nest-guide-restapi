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
      name: QueueName.REWARD_QUEUE,
      prefix: 'reward',
      limiter: { max: 100, duration: 60000 },
      defaultJobOptions: { attempts: 1, backoff: 3000, delay: 2000 },
    }),
  ],
})
export class QueueModule {}
