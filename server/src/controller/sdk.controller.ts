import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Data } from '../entity/data.entity';

@Controller('/open-api/v1', { ignoreGlobalPrefix: true })
export class DataController {
  @Inject()
  ctx: Context;

  @Post('/GetData')
  async list(@Body() body) {
    const projectId: number = this.ctx.getAttr('projectId');

    if (!body.groupName) {
      return {
        code: 1019,
        message: 'groupName不能为空',
      };
    }

    const data = await Data.findAll({
      where: { projectId: projectId, groupName: body.groupName },
    });

    return { code: 0, data: data };
  }
}
