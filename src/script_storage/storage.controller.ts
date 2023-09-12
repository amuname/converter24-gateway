import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  // Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { inspect } from 'node:util';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post('save_script/:account_id')
  // saveScript(
  //   @Req() request: { user: { userId: string; email: string } },
  //   @Param('account_id') account_id: string,
  //   @Body()
  //   data: {
  //     script;
  //   },
  // ) {
  //   console.log('\naccount_id\n', account_id, typeof account_id);
  //   console.log(inspect(data, { depth: 8 }));
  //   // const toNumber = isNaN(Number(account_id))
  //   //   ? Number(account_id)
  //   //   : account_id;

  //   // data.account_id = account_id;

  //   return this.storageService.saveScript({
  //     user_id: request.user.userId,
  //     account_id,
  //     ...data,
  //   });
  // }

  // // @Get('integration.findMany.byAccountUser')
  // // findManyByAccountUser(@Query() data: AccountIdAndUserIdNeedNumberfy) {
  // //   // console.log('route: integration.findMany.byAccountUser', 'data : ', data);
  // //   return this.storageService.findManyByAccountUser(data);
  // // }

  // @UseGuards(JwtAuthGuard)
  // @Get('account_schemas/:account_id')
  // getScriptsByAccounId(@Param('account_id') account_id: string) {
  //   console.log('account_id', account_id);
  //   return this.storageService.getScriptsByAccounId(account_id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get_script_by_script_id/:script_id/version/:version')
  // getScriptByUniqueId(
  //   @Param('script_id') script_id: string,
  //   @Param('version', ParseIntPipe) version: number,
  // ) {
  //   return this.storageService.getScriptByUniqueId(script_id, version);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('prepare_full_script/:script_id/version/:version/mode/:mode')
  // prepareFullScript(
  //   @Param('script_id') script_id: string,
  //   @Param('version', ParseIntPipe) version: number,
  //   @Param('config')
  //   config: {
  //     allowedMethods?: string[];
  //     requiredHeaders?: any[];
  //     waitForScriptEnd: boolean;
  //   },
  //   @Param('mode', new DefaultValuePipe('testing'))
  //   mode: 'testing' | 'production',
  //   @Body()
  //   data: Record<
  //     string,
  //     {
  //       from: 'proc' | 'context';
  //       value: any;
  //     }
  //   >,
  // ) {
  //   return this.storageService.prepareFullScript(
  //     script_id,
  //     version,
  //     mode,
  //     data,
  //     config,
  //   );
  // }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptById/:script_id')
  getScriptById(@Param('script_id') script_id: string) {
    return this.storageService.getScriptById(script_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptByIdAndVersion/:script_id')
  getScriptByIdAndVersion(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.getScriptByIdAndVersion(script_id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptsByAccountId/:account_id')
  getScriptsByAccountId(@Param('account_id') account_id: string) {
    return this.storageService.getScriptsByAccountId(account_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptVersionsById/:script_id')
  getScriptVersionsById(@Param('script_id') script_id: string) {
    return this.storageService.getScriptVersionsById(script_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptArgumentsSchema/:id')
  getScriptArgumentsSchema(
    @Param('id') id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.getScriptArgumentsSchema(id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getScriptReturnValueSchema/:script_id')
  getScriptReturnValueSchema(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.getScriptReturnValueSchema(script_id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saveScriptAsDraft/:account_id')
  saveScriptAsDraft(
    @Param('account_id') account_id: string,
    @Body('script') script: any,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('creator_id') creator_id: string,
  ) {
    return this.storageService.saveScriptAsDraft(
      account_id,
      script,
      name,
      description,
      creator_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateScriptDraft/:script_id')
  updateScriptDraft(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
    @Body('script') script: any,
  ) {
    return this.storageService.updateScriptDraft(script_id, version, script);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saveScriptForTesting/:script_id')
  saveScriptForTesting(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.saveScriptForTesting(script_id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Post('saveScriptForProduction/:script_id')
  saveScriptForProduction(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.saveScriptForProduction(script_id, version);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkScript/:script_id')
  checkScript(
    @Param('script_id') script_id: string,
    @Body('version') version: number,
  ) {
    return this.storageService.checkScript(script_id, version);
  }
}
