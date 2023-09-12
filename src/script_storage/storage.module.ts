import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

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
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
