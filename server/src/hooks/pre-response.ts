import type { Context } from "@x1.pub/rui";

const preResponseHandler = async (ctx: Context) => {
  if (!ctx._responseData && ctx.res.statusCode === 404) {
    ctx.send(JSON.stringify({
      code: 500,
      message: 'The server did not process the request correctly.'
    })).code(200).setHeader('content-type', 'application/json; charset=utf-8')
  }
}

export default preResponseHandler
