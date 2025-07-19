import { Inject, Controller, Query, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Group } from '../entity/group.entity';
import { IUserInfo } from '../interface';
import { Project } from '../entity/project.entity';

@Controller('/group')
export class GroupController {
  @Inject()
  ctx: Context;

  @Get('/group_tree')
  async list(@Query() query) {
    const user: IUserInfo = this.ctx.getAttr('user');
    const project = await Project.findOne({
      where: { owner: user.id, id: query.projectId },
    });
    if (!project) {
      return {
        code: 999,
        message: '无权限',
      };
    }

    const groups = await Group.findAll({
      where: { projectId: query.projectId, env: query.env },
      raw: true,
    });

    const groupMap: { [key: number]: any } = {};
    const tree = [];
    for (const group of groups) {
      // @ts-ignore
      group.children = [];
      groupMap[group.id] = group;
    }
    for (const group of groups) {
      if (group.parentId) {
        groupMap[group.parentId]?.children.push(group);
      } else {
        tree.push(group);
      }
    }

    return { code: 0, data: tree };
  }

  @Post('/create_group')
  async create(@Body() body) {
    const { env, projectId, parentId, name } = body;
    const user: IUserInfo = this.ctx.getAttr('user');

    const project = await Project.findOne({
      where: { owner: user.id, id: projectId },
    });

    if (!project) {
      return {
        code: 999,
        message: '无权限',
      };
    }

    const data = await Group.create({ env, projectId, parentId, name });
    return { code: 0, data };
  }
}
