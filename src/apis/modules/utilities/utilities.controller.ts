import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { JwtAuthGuard } from '../auth/guards/jwtAccessGuard';
import { StatusCodeModel } from '../../../constants/constant';
import {
  DescriptionConstants,
  ServiceConstants,
} from '../../../constants/mainConstant';
import { AuthMiddleware } from '../../../entities/common.entities';
import {
  DeleteValueResponse,
  DeleteValueResponseFailed,
  GetValueResponse,
  GetValueResponseFailed,
  SetValueResponse,
  SetValueResponseFailed,
} from './entities/utilities.entities';
import { SetValueRequest } from '../../../entities/request/utilities.request';
import { ResponseModel } from '../../../models/response/ControllerResponse';

@ApiTags('Utilities')
@Controller('utilities')
export class UtilitiesController {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get-cache/:key')
  @HttpCode(200)
  @ApiOperation({
    summary: 'get cache with cache key',
    description: 'ไว้สำหรับ get cache key',
  })
  @ApiOkResponse({
    description: 'get get cache with cache key',
    type: GetValueResponse,
  })
  @ApiBadRequestResponse({
    description: 'get get cache with cache key failed',
    type: GetValueResponseFailed,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Token',
    type: AuthMiddleware,
  })
  async getValue(@Param('key') key: string): Promise<ResponseModel> {
    try {
      const valueCache = await this.cacheManager.get<string>(key);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: ServiceConstants.UTILITIES_SERVICE,
          description: DescriptionConstants.GET_KEY_SUCCESS,
        },
        data: valueCache,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: ServiceConstants.UTILITIES_SERVICE,
            description: DescriptionConstants.GET_KEY_FAILED,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('set-cache')
  @HttpCode(201)
  @ApiOperation({
    summary: 'add cache from body',
    description: 'ไว้สำหรับ add cache key',
  })
  @ApiBody({
    description: 'Body for set Value in Cache',
    type: SetValueRequest,
  })
  @ApiCreatedResponse({
    description: 'get get cache with cache key',
    type: SetValueResponse,
  })
  @ApiBadRequestResponse({
    description: 'get get cache with cache key failed',
    type: SetValueResponseFailed,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Token',
    type: AuthMiddleware,
  })
  async setValue(@Body() body: SetValueRequest): Promise<ResponseModel> {
    try {
      const keyResult = await this.cacheManager.set(
        body.key,
        body.value,
        99999999,
      );

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: ServiceConstants.UTILITIES_SERVICE,
          description: DescriptionConstants.SET_KEY_SUCCESS,
        },
        data: keyResult,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: ServiceConstants.UTILITIES_SERVICE,
            description: DescriptionConstants.SET_KEY_FAILED,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete-cache/:key')
  @HttpCode(200)
  @ApiOperation({
    summary: 'delete cache with cache key',
    description: 'ไว้สำหรับ delete cache key',
  })
  @ApiOkResponse({
    description: 'get get cache with cache key',
    type: DeleteValueResponse,
  })
  @ApiBadRequestResponse({
    description: 'get get cache with cache key failed',
    type: DeleteValueResponseFailed,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Token',
    type: AuthMiddleware,
  })
  async deleteKey(@Param('key') key: string): Promise<ResponseModel> {
    try {
      const keyResult = await this.cacheManager.del(key);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: ServiceConstants.UTILITIES_SERVICE,
          description: DescriptionConstants.DEL_KEY_SUCCESS,
        },
        data: keyResult,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: ServiceConstants.UTILITIES_SERVICE,
            description: DescriptionConstants.DEL_KEY_FAILED,
            error: err.message,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
