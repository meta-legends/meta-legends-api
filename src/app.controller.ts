import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { AlchemyService } from './client/alchemy/alchemy.service';
import { LegendService } from './reward/legend/legend.service';
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor(private legendService: LegendService) {}

  @Get('/hello')
  async getHello() {
    return await this.legendService.getNftDataFromEtherscan(
      '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd',
    );
  }

  @Get('/hello2')
  async getHello2() {
    return await this.legendService.getNftDataFromAlchemy(
      '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd',
    );
  }

  @Get('/hello3')
  async getHello3() {
    return await this.legendService.process(
      '0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd'.toLowerCase(),
    );
  }
}
