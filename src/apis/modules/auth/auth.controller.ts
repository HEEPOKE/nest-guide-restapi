import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto, VerifyTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwtAccessGuard';
import { StatusCodeModel } from 'src/constants/constant';
import { AuthServiceConstant } from 'src/constants/authConstant';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() authDto: AuthDto) {
    try {
      const signInResult = await this.authService.signIn(authDto);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'Verify accessToken.',
        },
        data: signInResult,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'verifyToken error : ' + error,
        },
        data: null,
      };
    }
  }

  @Post('signUp')
  async signUp(@Body() authDto: AuthDto) {
    try {
      const signUpResult = await this.authService.signUp(authDto);

      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'Verify accessToken.',
        },
        data: signUpResult,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'verifyToken error : ' + error,
        },
        data: null,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('verifyToken')
  verifyToken(): any {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'Verify accessToken.',
        },
        data: true,
      };
    } catch (err) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'verifyToken error',
          error: err,
        },
        data: null,
      };
    }
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'refreshToken.',
        },
        data: await this.authService.refreshToken(refreshToken.refresh_token),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'RefreshToken error : ' + error,
        },
        data: null,
      };
    }
  }

  @Post('signOut')
  async signOut(@Body() accessToken: VerifyTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'signOut',
        },
        data: this.authService.signOut(accessToken.access_token),
      };
    } catch (err) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: AuthServiceConstant.AUTH_SERVICE,
          description: 'Logout error : ' + err,
        },
        data: null,
      };
    }
  }
}
