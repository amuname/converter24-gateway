import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KernelService } from './kernel.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('kernel')
export class KernelController {
  constructor(private kernelService: KernelService) {}

  @ApiResponse({ type: String })
  @Get('getHello')
  getHello() {
    // return { resp: 'hello' };
    return this.kernelService.getHello();
  }

  @Get('getAllModulesKeys')
  getAllModulesKeys() {
    return this.kernelService.getAllModulesKeys();
  }

  @Get('getAllModuleFunctionsByModuleTag/:module_tag')
  getAllModuleFunctionsByModuleTag(@Param('module_tag') module_tag: string) {
    return this.kernelService.getAllModuleFunctionsByModuleTag(module_tag);
  }

  @Post('createScriptProcess')
  createScriptProcess(
    @Body()
    arg: {
      blockCallSchema: any;
      is_testingMode: boolean;
      script_arguments: Record<string, any>;
    },
  ) {
    return this.kernelService.createScriptProcess(arg);
  }
}
