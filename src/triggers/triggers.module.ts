import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WebhookTriggerController } from './webhook-trigger.controller';
import { WebhookTriggerService } from './webhook-trigger.service';

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
  controllers: [WebhookTriggerController],
  providers: [WebhookTriggerService],
  // exports: [TriggerService],
})
export class TriggerModule {}
