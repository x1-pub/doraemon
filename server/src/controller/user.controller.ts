import {
  Inject,
  Controller,
  Get,
  Post,
  makeHttpRequest,
  Config,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { SESSION_NAME } from '../utils';
import { ISSOResData } from '../interface';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Config('sso')
  sso: any;

  @Get('/user_info')
  async info() {
    const user = this.ctx.getAttr('user');
    return {
      code: 0,
      message: '请求成功',
      data: user,
    };
  }

  @Post('/logout')
  async logout() {
    const sessionId = this.ctx.cookies.get(SESSION_NAME);
    const callbackUrl = this.ctx.request.header.referer;
    const response = await makeHttpRequest<ISSOResData>(
      `${this.sso.host}/api/business/logout`,
      {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: {
          sessionId,
          callbackUrl,
          appId: this.sso.appId,
          appSecret: this.sso.appSecret,
        },
      }
    );
    const { code, data, message } = response.data as ISSOResData;
    if (code === 0) {
      return {
        data,
        code: 10010,
      };
    }
    return {
      code: 9999,
      message: message || '未知错误',
    };
  }
}
