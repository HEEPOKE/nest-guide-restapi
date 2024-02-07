import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './apis/modules/auth/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'common check',
    description: 'common check',
  })
  getHello(): string {
    return this.appService.getHandler();
  }
}
