import {
  Inject,
  Controller,
  Get,
  Query,
  makeHttpRequest,
  Config,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { ISSOResData } from '../interface';
import { SESSION_NAME } from '../utils';

@Controller('/auth')
export class APIController {
  @Inject()
  ctx: Context;

  @Config('sso')
  sso: any;

  @Get('/ticket')
  async auth(@Query() query) {
    const { ticket, callbackUrl } = query;
    const response = await makeHttpRequest<ISSOResData>(
      `${this.sso.host}/api/business/auth/ticket`,
      {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: {
          ticket,
          appId: this.sso.appId,
          appSecret: this.sso.appSecret,
        },
      }
    );
    const { code, data } = response.data as ISSOResData;
    if (code === 0) {
      this.ctx.cookies.set(SESSION_NAME, data.sessionId);
      this.ctx.redirect(callbackUrl);

      return { code: 0 };
    }
  }
}
