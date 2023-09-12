import {
  Controller,
  Request,
  // Query,
  // Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // console.log(req);
    const jwt = await this.authService.login(req.user);
    // const user = req.user;

    return jwt;
  }
}
