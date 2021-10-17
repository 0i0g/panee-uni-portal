import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { TokenSignInDTO } from 'src/user/dto/token-sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('tokensignin')
  @HttpCode(200)
  async tokenSignin(@Body() { token }: TokenSignInDTO) {
    return { token: await this.authService.tokenSignin(token) };
  }

  @Get('user')
  async getUser() {}

  @Get()
  welcome() {
    return 'Welcome';
  }
}
