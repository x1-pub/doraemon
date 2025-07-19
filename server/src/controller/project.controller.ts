import { Inject, Controller, Body, Post, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { v4 as uuidv4 } from 'uuid';

import { Project } from '../entity/project.entity';
import { IUserInfo } from '../interface';

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Post('/create_project')
  async create(@Body() body) {
    const { name, nameCn, description } = body;
    const user: IUserInfo = this.ctx.getAttr('user');

    const data = await Project.create({
      name,
      nameCn,
      description,
      owner: user.id,
      appSecret: uuidv4(),
    });
    return { code: 0, data };
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
