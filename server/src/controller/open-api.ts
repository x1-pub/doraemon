import { createHash } from 'node:crypto';
import type { Context } from "@x1.pub/rui";
import Project from "../models/project";
import { GetDataDTO } from '../dto/open-api';
import Data from '../models/data';

class OpenApiController {
  private constructor() { }

  private static auth = async (ctx: Context) => {
    const {
      'doraemon-timestamp': userTimestamp,
      'doraemon-app': userApp,
      'doraemon-sign': userSign,
    } = ctx.req.headers;
    const timestamp = Date.now() / 1000;

    if (Math.abs(timestamp - Number(userTimestamp)) > 120) {
      return {
        code: 1011,
        message: 'timestamp over',
      };
    }

    const project = await Project.findOne({ where: { name: userApp } });
    if (!project) {
      return {
        code: 1012,
        message: 'project empty',
      };
    }

    const sign = createHash('md5')
      .update(`${userTimestamp}${userApp}${project.appSecret}`)
      .digest('hex');
    if (sign !== userSign) {
      return {
        code: 1013,
        message: 'sign not allowed',
      };
    }

    return {
      code: 0,
      data: project.id
    }
  }

  static getData = async (ctx: Context) => {
    const auth = await OpenApiController.auth(ctx)
    if (auth.code !== 0) {
      ctx.json(auth)
      return
    }
    const projectId = auth.data as number

    const { groupName, env } = await GetDataDTO(ctx.body)

    const data = await Data.findAll({
      where: { projectId: projectId, groupName, env },
    });

    ctx.json({
      code: 0,
      message: 'success',
      data
    })
  }
}

export default OpenApiController
