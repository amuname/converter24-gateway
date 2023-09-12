import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HashService } from './hash.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSPORT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
