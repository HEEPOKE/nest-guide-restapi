import { ApiProperty } from '@nestjs/swagger';

export class AuthMiddleware {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Response Message',
  })
  message: string;

  @ApiProperty({
    example: 401,
    description: 'StatusCode Message',
  })
  statusCode: number;
}
