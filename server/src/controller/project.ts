import { v4 as uuidv4 } from 'uuid';
import type { Context } from "@x1.pub/rui";

import Project from "../models/project";
import { CreateProjectDTO } from "../dto/project";

class ProjectController {
  private constructor() { }

  static list = async (ctx: Context) => {
    const lists = await Project.findAll({
      where: { owner: ctx.user.id },
      raw: true,
    })
    
    ctx.json({
      code: 0,
      message: 'success',
      data: lists
    })
  }

  static create = async (ctx: Context) => {
    const { name, nameCn, description } = await CreateProjectDTO(ctx.body)
    const data = await Project.create({
      name,
      nameCn,
      description,
      owner: ctx.user.id,
      appSecret: uuidv4(),
    });

    ctx.json({
      code: 0,
      message: 'success',
      data
    })
  }
}

export default ProjectController
