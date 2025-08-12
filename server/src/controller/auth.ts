import type { Context } from "@x1.pub/rui";
import { SESSION_NAME } from "../config";

class AuthController {
  private constructor() { }

  static ticket = async (ctx: Context) => {
    const { ticket, callbackUrl } = ctx.query;

    const { code, data, message } = await ctx.sso.AuthTicket({ ticket: String(ticket) })

    if (code === 0) {
      ctx.setCookie(SESSION_NAME, data.sessionId);
      ctx.redirect(String(callbackUrl));
      return
    }

    ctx.json({ code, data, message })
  }
}

export default AuthController
