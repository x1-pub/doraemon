import { Server } from "@x1.pub/sso";
import type { Context, Next } from "@x1.pub/rui";

import { local, prod } from '../../sensitive-config.json'
import { SESSION_NAME } from '../config/index'

const sensitiveConfig = process.env.NODE_ENV === 'production' ? prod : local

const server = new Server({
  appId: sensitiveConfig.sso.appId,
  appSecret: sensitiveConfig.sso.appSecret,
})

const auth = async (ctx: Context, next: Next) => {
  ctx.sso = server

  if (ctx.pathname.startsWith('/api') && !ctx.pathname.startsWith('/api/auth')) {
    const result = await server.AuthSessionId({
      sessionId: ctx.getCookie(SESSION_NAME),
      callbackUrl: ctx.req.headers.referer,
    })

    if (result.code === 0) {
      ctx.user = (result as any).data
    } else {
      ctx.json(result)
      return
    }
  }

  await next()
}

export default auth