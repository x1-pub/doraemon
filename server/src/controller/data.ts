import type { Context } from "@x1.pub/rui";
import { v4 as uuidv4 } from 'uuid';

import Project from "../models/project";
import Data from "../models/data";
import { CreateDataDTO, DataListDTO, DeleteDataDTO, ModifyDataDTO } from "../dto/data";
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
      where: { groupId, isLatest: true },
    });

    ctx.json({
      code: 0,
      message: 'success',
      data: list
    })
  }

  static delete = async (ctx: Context) => {
    const { dataId, projectId } = await DeleteDataDTO(ctx.body);

    const project = await Project.findOne({
      where: { owner: ctx.user.id, id: projectId },
    });
    if (!project) {
      ctx.json({
        code: 999,
        message: '无权限',
      });
      return
    }

    await Data.destroy({ where: { id: dataId } })

    ctx.json({
      code: 0,
      message: 'success',
    })
  }

  static modify = async (ctx: Context) => {
    const { id, projectId, type, content, desc } = await ModifyDataDTO(ctx.body);

    const project = await Project.findOne({
      where: { owner: ctx.user.id, id: projectId },
    });
    if (!project) {
      ctx.json({
        code: 999,
        message: '无权限',
      });
      return
    }

    const preVersionData = await Data.findOne({
      where: { id, isLatest: true },
    })
    if (!preVersionData || (preVersionData.type === type && preVersionData.content === content && preVersionData.desc === desc)) {
      ctx.json({
        code: 999,
        message: '未检测到修改',
      });
      return
    }
    await preVersionData.updateWithVersion({ type, content, desc })

    ctx.json({
      code: 0,
      message: 'success',
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

    const hasName = await Data.findOne({
      where: { name, isLatest: true }
    })
    if (hasName) {
      ctx.json({
        code: 999,
        message: 'Key重复',
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
      entityId: uuidv4()
    });

    ctx.json({
      code: 0,
      message: 'success',
      data
    })
  }
}

export default DataController
