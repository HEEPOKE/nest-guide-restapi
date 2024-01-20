import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [UtilitiesController],
  exports: [UtilitiesService],
  providers: [UtilitiesService],
})
export class UtilitiesModule {}
