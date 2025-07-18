import { Inject, Controller, Query, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Data } from '../entity/data.entity';

@Controller('/data')
export class DataController {
  @Inject()
  ctx: Context;

  @Get('/data_list')
  async list(@Query() query) {
    const list = await Data.findAll({
      where: { groupId: query.groupId },
    });
    return { code: 0, data: list };
  }
}
