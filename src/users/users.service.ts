import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
// import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  async createUser<T extends { email: string; password: string }>(arg: T) {
    console.log('arg: ', arg);
    const isAlreadyExist = await firstValueFrom(
      this.transport.send<boolean>({ cmd: 'user.create' }, arg),
    );

    console.log('isAlreadyExist ', isAlreadyExist);
    if (isAlreadyExist) throw new ConflictException();

    this.transport.emit({ evt: 'user.created' }, arg);
    return;
  }

  async userLogin(data: string) {
    return this.transport.send({ cmd: 'user.login' }, data);
  }

  findOne(email: string) {
    return this.transport.send({ cmd: 'user.find' }, email);
  }

  allAccounts(email: string) {
    return this.transport.send({ cmd: 'user.allAccounts' }, email);
  }
}
