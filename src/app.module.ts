import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
