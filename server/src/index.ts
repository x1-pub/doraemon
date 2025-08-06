import Rui from "@x1.pub/rui";

import routerPlugin from "./plugins/router";
import mysqlPlugin from "./plugins/mysql";
import errorHandler from "./hooks/error";
import preResponseHandler from "./hooks/pre-response";
import auth from './middleware/auth'

const rui = Rui()

rui
  .addPlugin(mysqlPlugin)
  .addPlugin(routerPlugin)
  .addHook('onError', errorHandler)
  .addHook('onPreResponse', preResponseHandler)
  .addMiddleware(auth)

rui.listen(7102, () => {
  console.log('Doraemon server running at http://localhost:7102')
})