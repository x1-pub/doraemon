import { Inject, Controller, Query, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Group } from '../entity/group.entity';

@Controller('/group')
export class GroupController {
  @Inject()
  ctx: Context;

  @Get('/group_tree')
  async list(@Query() query) {
    console.log(query);
    // TODO: 先验证用户的project权限
    const tree = await Group.findAll({
      where: { projectId: query.projectId, parentId: null, env: query.env },
      include: {
        model: Group,
        as: 'children',
        required: false,
      },
    });
    return { code: 0, data: tree };
  }
}
