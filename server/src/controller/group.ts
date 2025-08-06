import type { Context } from "@x1.pub/rui";
import { CreateGroupDTO, GroupTreeDTO } from "../dto/group";
import Project from "../models/project";
import Group from "../models/group";

class GroupController {
  private constructor() { }

  static tree = async (ctx: Context) => {
    const { projectId, env } = await GroupTreeDTO(ctx.query)

    const project = await Project.findOne({
      where: { owner: ctx.user.id, id: projectId },
    });
    if (!project) {
      ctx.json({
        code: 999,
        message: '无权限',
      })
      return
    }

    const groups = await Group.findAll({
      where: { projectId, env },
      raw: true,
    });

    const groupMap: { [key: number]: any } = {};
    const tree = [];
    for (const group of groups) {
      // @ts-expect-error
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

    ctx.json({
      code: 0,
      message: 'success',
      data: tree
    })
  }

  static create = async (ctx: Context) => {
    const { env, projectId, parentId, name } = await CreateGroupDTO(ctx.body);
    const user = ctx.user

    const project = await Project.findOne({
      where: { owner: user.id, id: projectId },
    });
    if (!project) {
      ctx.json({
        code: 999,
        message: '无权限',
      })
      return
    }

    const data = await Group.create({ env, projectId, parentId, name });

    ctx.json({
      code: 0,
      message: 'success',
      data,
    })
  }
}

export default GroupController
