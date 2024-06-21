import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGurad } from './utils/LocalGuard';
import { UserDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserDto) {
    return this.authService.registerUser({ ...user });
  }
  @Post('login')
  async login(@Body() loginDto: UserDto) {
    const { username, password } = loginDto;

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.authService.login(user);
    return { accessToken };
  }
}
