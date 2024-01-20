import { ApiProperty } from '@nestjs/swagger';
import { StatusCodeModel } from '../../../../constants/constant';
import {
  DescriptionConstants,
  ServiceConstants,
} from '../../../../constants/mainConstant';
import { StatusModel } from '../../../../models/StatusModel';

export class GetValueResponse {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.GET_KEY_SUCCESS,
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: 'example',
    description: 'message value',
  })
  data: string;
}

export class GetValueResponseFailed {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.GET_KEY_FAILED,
        error: 'error message',
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: null,
    description: 'message value',
  })
  data: string | null;
}

export class SetValueResponse {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.SET_KEY_SUCCESS,
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: 'example',
    description: 'message value',
  })
  data: string;
}

export class SetValueResponseFailed {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.SET_KEY_FAILED,
        error: 'error message',
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: null,
    description: 'message value null',
  })
  data: string | null;
}

export class DeleteValueResponse {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.SUCCESS.code,
        message: StatusCodeModel.SUCCESS.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.DEL_KEY_SUCCESS,
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: 'example',
    description: 'message value',
  })
  data: string;
}

export class DeleteValueResponseFailed {
  @ApiProperty({
    example: {
      status: {
        code: StatusCodeModel.FAILED.code,
        message: StatusCodeModel.FAILED.message,
        service: ServiceConstants.UTILITIES_SERVICE,
        description: DescriptionConstants.DEL_KEY_FAILED,
        error: 'error message',
      },
    },
    description: 'Response Status',
  })
  status: StatusModel;

  @ApiProperty({
    example: null,
    description: 'message value',
  })
  data: string | null;
}
