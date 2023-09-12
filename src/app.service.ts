import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  async onModuleInit() {
    // Connect your client to the NATS server on startup.
    await this.transport.connect();
  }

  getHello() {
    return of('hello from gateway');
  }

  async onModuleDestroy() {
    await this.transport.close();
  }
}
