import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health/check')
  @HttpCode(200)
  @ApiOperation({
    summary: 'common check',
    description: 'common check',
  })
  getHello(): string {
    return this.appService.getHandler();
  }
}
