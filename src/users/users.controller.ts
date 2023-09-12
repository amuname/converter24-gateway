import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  // Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() user_credentials) {
    // console.log(data);
    return this.userService.createUser(user_credentials);
  }

  // @Get('user.login')
  // hashtest(@Query() user_credentials: any) {
  //   return this.userService.userLogin(user_credentials);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('accounts')
  hashtest(@Req() request: { user: { userId: number; email: string } }) {
    console.log(request.user.email);
    return this.userService.allAccounts(request.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wtf')
  wtf(@Req() request: any) {
    console.log('REQUEST !!!\n\n', request.user, '\n\n');
    return 'user wtf';
  }
}
