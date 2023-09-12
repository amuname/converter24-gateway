import { Module } from '@nestjs/common';
import { KernelService } from './kernel.service';
import { KernelController } from './kernel.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  providers: [KernelService],
  controllers: [KernelController],
})
export class KernelModule {}
