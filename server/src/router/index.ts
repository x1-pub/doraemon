import type { RuiInstance } from "@x1.pub/rui";

import UserController from "../controller/user";
import OpenApiController from "../controller/open-api";
import ProjectController from "../controller/project";
import GroupController from "../controller/group";
import DataController from "../controller/data";
import AuthController from "../controller/auth";

const routerPlugin = (rui: RuiInstance) => {
  // api: for web
  rui.router.group('/api', router => {
    // user
    router.group('/user', router => {
      router.get('/user_info', UserController.info)
      router.post('/logout', UserController.logout)
    })

    // project
    router.group('/project', router => {
      router.post('/create_project', ProjectController.create)
      router.get('/project_list', ProjectController.list)
    })
    
    // group
    router.group('/group', router => {
      router.get('/group_tree', GroupController.tree)
      router.post('/create_group', GroupController.create)
    })
    
    // data
    router.group('/data', router => {
      router.get('/data_list', DataController.list)
      router.post('/create_data', DataController.create)
      router.post('/delete_data', DataController.delete)
      router.post('/modify_data', DataController.modify)
    })
    
    // auth: for sso
    router.group('/auth', router => {
      router.get('/ticket', AuthController.ticket)
    })
  })

  // open api: for sdk
  rui.router.group('/open-api/v1', router => {
    router.get('/GetData', OpenApiController.getData)
  })

  // handle 404
  rui.router.all('/*', async ctx => {
    ctx.send({
      code: 404,
      message: 'Not Found',
    })
  })
}

export default routerPlugin
