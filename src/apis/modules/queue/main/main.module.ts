import { Module } from '@nestjs/common';
import { MainConsumer } from './main.processor';
import { MainService } from './main.service';

@Module({
  providers: [MainService, MainConsumer],
})
export class MainModule {}
