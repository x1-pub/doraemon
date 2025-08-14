import type { Context } from "@x1.pub/rui";
import { ValidationError } from "@x1.pub/rui";

const errorHandler = async (ctx: Context, err: Error) => {
  console.log(err)
  if (err instanceof ValidationError) {
    const firstInfo = err.info[0]
    ctx.json({
      code: err.statusCode,
      message: `${firstInfo.field || 'parameter'} ${firstInfo.message}`,
    })
    return
  }
  ctx.json({
    code: 500,
    message: err.message || 'Internal Server Error',
  })
}

export default errorHandler
