import {
  Middleware,
  IMiddleware,
  makeHttpRequest,
  Config,
} from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { createHash } from 'node:crypto';

import { ISSOResData } from '../interface';
import { SESSION_NAME } from '../utils';
import { Project } from '../entity/project.entity';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('sso')
  sso: any;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 普通 api 鉴权
      if (
        !ctx.request.url.startsWith('/api/auth') &&
        ctx.request.url.startsWith('/api')
      ) {
        const sessionId = ctx.cookies.get(SESSION_NAME);
        const callbackUrl = ctx.request.header.referer;
        const response = await makeHttpRequest<ISSOResData>(
          `${this.sso.host}/api/business/auth/session`,
          {
            method: 'POST',
            dataType: 'json',
            contentType: 'json',
            data: {
              sessionId,
              appId: this.sso.appId,
              appSecret: this.sso.appSecret,
              callbackUrl,
            },
          }
        );
        const { code, data } = response.data as ISSOResData;
        if (code === 10010) {
          return response.data;
        }
        if (code !== 0) {
          return {
            code: 10010,
            message:
              (response.data as ISSOResData)?.message || '鉴权发生未知错误',
          };
        }
        if (code === 0) {
          ctx.setAttr('user', data);
        }
      }

      // Open API 鉴权
      if (ctx.request.url.startsWith('/open-api')) {
        const {
          'doraemon-timestamp': userTimestamp,
          'doraemon-app': userApp,
          'doraemon-sign': userSign,
        } = ctx.request.headers;
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
            code: 1011,
            message: 'project empty',
          };
        }

        const sign = createHash('md5')
          .update(`${userTimestamp}${userApp}${project.appSecret}`)
          .digest('hex');
        if (sign !== userSign) {
          return {
            code: 1011,
            message: 'sign not allowed',
          };
        }

        ctx.setAttr('projectId', project.id);
      }

      const result = await next();
      return result;
    };
  }

  static getName(): string {
    return 'auth';
  }
}
