import { Inject, Controller, Query, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { Data } from '../entity/data.entity';
import { IUserInfo } from '../interface';
import { Project } from '../entity/project.entity';
import { Group } from '../entity/group.entity';

@Controller('/data')
export class DataController {
  @Inject()
  ctx: Context;

  @Get('/data_list')
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

    const list = await Data.findAll({
      where: { groupId: query.groupId },
    });
    return { code: 0, data: list };
  }

  @Post('/create_data')
  async create(@Body() body) {
    const { groupId, name, type, content, desc } = body;
    const user: IUserInfo = this.ctx.getAttr('user');

    const group = await Group.findByPk(groupId);
    if (!group) {
      return {
        code: 999,
        message: '分组不存在',
      };
    }

    const project = await Project.findOne({
      where: { owner: user.id, id: group.projectId },
    });
    if (!project) {
      return {
        code: 999,
        message: '无权限',
      };
    }

    let groupName = group.name;
    let parentGroupId = group.parentId;
    while (parentGroupId) {
      const parentGroup = await Group.findByPk(parentGroupId);
      if (parentGroup) {
        groupName = `${parentGroup.name}.${groupName}`;
      }
      parentGroupId = parentGroup?.parentId;
    }

    const data = await Data.create({
      groupId,
      name,
      type,
      content,
      desc,
      projectId: group.projectId,
      env: group.env,
      groupName,
    });
    return { code: 0, data };
  }
}
