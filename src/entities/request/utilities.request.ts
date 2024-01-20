import { ApiProperty } from '@nestjs/swagger';

export class SetValueRequest {
  @ApiProperty({
    description: 'set  of the key name',
    example: 'Some value',
  })
  key: string;

  @ApiProperty({
    description: 'set  of the value',
    example: 'Some value',
  })
  value: string;
}
