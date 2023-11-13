import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PrefixEnum } from "../../../../models/enum/prefix.enum";

export class CreateAccountDto {
    @ApiProperty({
      description: 'Prefix',
      example: 'MR',
      enum: PrefixEnum,
    })
    @IsString()
    prefix: PrefixEnum;

    @ApiProperty({
      description: 'Email',
      example: 'example@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({
      description: 'Password',
      example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
      description: 'username',
      example: 'heePoke',
    })
    @IsString()
    username: string;

    @ApiProperty({
      description: 'tel',
      example: '0000000000',
    })
    @IsString()
    tel: string;
  }