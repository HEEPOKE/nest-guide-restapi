import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthServiceConstant } from 'src/constants/authConstant';

export class AuthDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'heepoke',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Password',
    example: AuthServiceConstant.ENCRYPT_PASSWORD,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh Token',
    example: 'refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class VerifyTokenDto {
  @ApiProperty({
    description: 'Access Token',
    example: 'access token',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
