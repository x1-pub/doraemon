import type { Context } from "@x1.pub/rui";

class UserController {
  private constructor() { }

  static info = (ctx: Context) => {
    ctx.send({
      code: 0,
      message: 'success',
      data: ctx.user
    })
  }

  static logout = (ctx: Context) => {
    ctx.send({
      code: 0,
      message: 'success',
      data: 'logout'
    })
  }
}

export default UserController
