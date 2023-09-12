import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HashModule } from './hash/hash.module';
import { StorageModule } from './script_storage/storage.module';
import { KernelModule } from './kernel/kernel.module';
import { TriggerModule } from './triggers/triggers.module';

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
    UsersModule,
    AuthModule,
    HashModule,
    StorageModule,
    KernelModule,
    TriggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
