import { Inject, Controller, Post, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Project } from '../entity/project.entity';
import { IUserInfo } from '../interface';

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Post('/create')
  async create() {
    return { code: 0, data: '123213' };
  }

  @Get('/project_list')
  async list() {
    const user: IUserInfo = this.ctx.getAttr('user');
    const list = await Project.findAll({
      where: { owner: user.id },
    });
    return { code: 0, data: list };
  }
}
