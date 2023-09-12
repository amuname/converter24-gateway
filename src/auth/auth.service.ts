import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await firstValueFrom(this.usersService.findOne(username));

    console.log('user', user);
    const isValid = await firstValueFrom(
      this.hashService.compareHash({
        string: pass,
        hash: user.hash,
      }),
    );

    if (isValid) {
      const userData = { ...user, hash: undefined };
      return userData;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    // try {
    const access_token = this.jwtService.sign(payload);
    return { access_token };
    // return {
    //   statusCode: 201,
    //   message: 'Created',
    //   data: {
    //     access_token,
    //   },
    // };
    // }
  }
}
