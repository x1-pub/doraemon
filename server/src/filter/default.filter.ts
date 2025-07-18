import { Catch, MidwayHttpError, Config } from '@midwayjs/core';

@Catch()
export class DefaultErrorFilter {
  @Config('koa')
  koaConfig;

  async catch(err: Error) {
    return {
      code:
        (err as MidwayHttpError).status ||
        (err as MidwayHttpError).code ||
        9999,
      message: err.message || '服务器发生错误',
    };
  }
}
