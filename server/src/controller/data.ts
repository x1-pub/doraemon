import type { Context } from "@x1.pub/rui";
import Project from "../models/project";
import Data from "../models/data";
import { CreateDataDTO, DataListDTO } from "../dto/data";
import Group from "../models/group";

class DataController {
  private constructor() { }

  static list = async (ctx: Context) => {
    const { projectId, groupId } = await DataListDTO(ctx.query)
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

    const list = await Data.findAll({
      where: { groupId },
    });

    ctx.send({
      code: 0,
      message: 'success',
      data: list
    })
  }

  static create = async (ctx: Context) => {
    const { groupId, name, type, content, desc } = await CreateDataDTO(ctx.body);

    const group = await Group.findByPk(groupId);
    if (!group) {
      ctx.json({
        code: 999,
        message: '分组不存在',
      })
      return
    }

    const project = await Project.findOne({
      where: { owner: ctx.user.id, id: group.projectId },
    });
    if (!project) {
      ctx.json({
        code: 999,
        message: '无权限',
      });
      return
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

    ctx.send({
      code: 0,
      message: 'success',
      data
    })
  }
}

export default DataController
