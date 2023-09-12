import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HashService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  compareHash(data) {
    return this.transport.send({ cmd: 'hash.compare' }, data);
  }
}
