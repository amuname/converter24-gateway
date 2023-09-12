import {
  Controller,
  Post,
  Get,
  Headers,
  Query,
  Body,
  // Request,
  UseGuards,
  Req,
  Param,
  // ParseIntPipe,
  Patch,
  ParseIntPipe,
  All,
} from '@nestjs/common';
import { Request } from 'express';
import { WebhookTriggerService } from './webhook-trigger.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('webhook-trigger')
export class WebhookTriggerController {
  constructor(private readonly triggerService: WebhookTriggerService) {}

  @All('gateway/:account_id/:script_id')
  allRequestsController(
    // @HostParam() host,
    // @Ip() ip,
    @Headers() headers,
    @Query() query,
    @Body() body,
    @Param('account_id') account_id: string,
    @Param('script_id') script_id: string,
    @Param('version') version: number,
    @Req() req: Request,
  ) {
    const method = req.method;
    const cookies = req.cookies;
    // const cookies = req;
    const req_info = {
      // host,
      // ip,
      headers,
      query,
      body,
      account_id,
      script_id,
      version,
      method,
      cookies,
    };
    return this.triggerService.allRequestsService(req_info);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addScript')
  addScript(
    @Body('account_id') account_id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('version') version: number,
    @Body('script_arguments') script_arguments: string,
    @Body('script_id') script_id: string,
    @Body('script') script: string,
    @Body('config')
    config: {
      allowedMethods: string;
      requiredHeaders: string;
      waitForScriptEnd: boolean;
    },
  ) {
    // console.log(data);
    return this.triggerService.addScript({
      account_id,
      script_id,
      name,
      description,
      version,
      script_arguments,
      script,
      config,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllScripts/:account_id')
  getAllScripts(@Param('account_id') account_id: string) {
    console.log('webhook/allScripts/:account_id', 'account_id', account_id);
    return this.triggerService.getAllScripts(account_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('setEnableOrDisable/:script_id')
  setEnableOrDisable(
    @Param('script_id', ParseIntPipe) script_id: number, // почему number
    @Body('enable') enable: boolean,
  ) {
    // console.log('webhook/:account_id/triggers', 'account_id', account_id);
    return this.triggerService.setEnableOrDisable({ script_id, enable });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user.wtf')
  wtf(@Req() request: any) {
    console.log('REQUEST !!!\n\n', request.user, '\n\n');
    return 'user wtf';
  }
}
