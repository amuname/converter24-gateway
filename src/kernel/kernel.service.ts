import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KernelService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  getHello() {
    return this.transport.send('script-kernel.get-hello', {});
  }

  getAllModulesKeys() {
    return this.transport.send('script-kernel.get-all-modules-keys', {});
  }

  getAllModuleFunctionsByModuleTag(module_tag: string) {
    return this.transport.send('script-kernel.get-all-module-functions', {
      module_tag,
    });
  }

  createScriptProcess(arg: {
    blockCallSchema: any;
    is_testingMode: boolean;
    script_arguments: Record<string, any>;
  }) {
    return this.transport.send('script-kernel.create-script-process', arg);
  }
}
