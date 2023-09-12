import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountIdAndUserIdAndName } from './interfaces/account-id-and-user-id-and-name.interface';
import {
  AccountIdAndUserId,
  AccountIdAndUserIdNeedNumberfy,
} from './interfaces/account-id-and-user-id.interface';

@Injectable()
export class StorageService {
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}

  // saveScript(data: { user_id: string; account_id: string; script: any }) {
  //   // console.log(data);
  //   return this.transport.send({ cmd: 'script_storage.save_script' }, data);
  // }

  // // findManyByAccountUser(data: AccountIdAndUserIdNeedNumberfy) {
  // //   const prepared: AccountIdAndUserId = {
  // //     userId: Number(data.userId),
  // //     accountId: Number(data.accountId),
  // //   };
  // //   return this.transport.send(
  // //     { cmd: 'integration.findMany.byAccountUser' },
  // //     prepared,
  // //   );
  // // }

  // getScriptsByAccounId(account_id: string) {
  //   return this.transport.send(
  //     { cmd: 'script_storage.get_scripts_by_account_id' },
  //     { account_id },
  //   );
  // }

  // getScriptByUniqueId(script_id: string, version: number) {
  //   return this.transport.send(
  //     { cmd: 'script_storage.get_script_by_id' },
  //     { script_id, version },
  //   );
  // }

  // prepareFullScript(
  //   script_id: string,
  //   version: number,
  //   mode: 'testing' | 'production',
  //   data: Record<
  //     string,
  //     {
  //       from: 'proc' | 'context';
  //       value: any;
  //     }
  //   >,
  //   config: {
  //     allowedMethods?: string[];
  //     requiredHeaders?: any[];
  //     waitForScriptEnd: boolean;
  //   },
  // ) {
  //   return this.transport.send(
  //     { cmd: 'script_storage.prepareScript' },
  //     { script_id, version: version, injector: data, mode, config },
  //   );
  // }

  getScriptById(script_id: string) {
    return this.transport.send('script-storage.get-script-by-id', {
      script_id,
    });
  }

  getScriptByIdAndVersion(script_id: string, version: number) {
    return this.transport.send('script-storage.get-script-by-id-and-version', {
      script_id,
      version,
    });
  }

  getScriptsByAccountId(account_id: string) {
    return this.transport.send('script-storage.get-scripts-by-account-id', {
      account_id,
    });
  }

  getScriptVersionsById(script_id: string) {
    return this.transport.send('script-storage.get-script-versions-by-id', {
      script_id,
    });
  }

  getScriptArgumentsSchema(id: string, version: number) {
    return this.transport.send('script-storage.get-script-arguments-schema', {
      id,
      version,
    });
  }

  getScriptReturnValueSchema(id: string, version: number) {
    return this.transport.send(
      'script-storage.get-script-return-value-schema',
      {
        id,
        version,
      },
    );
  }

  saveScriptAsDraft(
    account_id: string,
    script: any,
    name: string,
    description: string,
    creator_id: string,
  ) {
    return this.transport.send('script-storage.save-script-as-draft', {
      account_id,
      script,
      name,
      description,
      creator_id,
    });
  }

  updateScriptDraft(script_id: string, version: number, script: any) {
    return this.transport.send('script-storage.update-script-draft', {
      script_id,
      version,
      script,
    });
  }

  saveScriptForTesting(script_id: string, version: number) {
    return this.transport.send('script-storage.save-script-for-testing', {
      script_id,
      version,
    });
  }

  saveScriptForProduction(script_id: string, version: number) {
    return this.transport.send('script-storage.save-script-for-production', {
      script_id,
      version,
    });
  }

  checkScript(id: string, version: number) {
    return this.transport.send('script-storage.check_script', {
      id,
      version,
    });
  }
}
