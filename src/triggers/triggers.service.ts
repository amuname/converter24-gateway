// import { Injectable, Inject } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// // import { StorageService } from '../integration/storage.service';

// // import { timeout } from 'rxjs';

// @Injectable()
// export class TriggerService {
//   constructor(
//     @Inject('TRANSPORT') private transport: ClientProxy, // private storageService: StorageService,
//   ) {}

//   allRequestsService(req_info) {
//     return this.transport.emit({ evt: 'webhook_trigger.add_script' }, req_info);
//   }

//   addScript(arg) {
//     console.log('arg: ', arg);

//     // this.storageService.prepareFullScript()

//     return this.transport.emit({ evt: 'webhook_trigger.add_script' }, arg);
//     // .pipe(() => this.allScripts(arg.account_id));
//   }

//   allScripts(account_id: string) {
//     return this.transport.send(
//       { cmd: 'webhook_trigger.get_account_scripts' },
//       { account_id },
//     );
//   }

//   setEnableTo(data: { script_id: number; enable: boolean }) {
//     return this.transport.send({ cmd: 'webhook_trigger.set_enable_to' }, data);
//   }
// }
