import type { RuiInstance } from "@x1.pub/rui";
import { Sequelize } from "sequelize-typescript";

import Project from "../models/project";
import Group from "../models/group";
import Data from "../models/data";

import { local, prod } from '../../sensitive-config.json'

const sensitiveConfig = process.env.NODE_ENV === 'production' ? prod : local

console.log(process.env.NODE_ENV)

const mysqlPlugin = async (rui: RuiInstance) => {
  const sequelize = new Sequelize({
    database: 'doraemon',
    dialect: 'mysql',
    define: { charset: 'utf8' },
    timezone: '+08:00',
    username: sensitiveConfig.mysql.username,
    password: sensitiveConfig.mysql.password,
    host: sensitiveConfig.mysql.host,
    port: sensitiveConfig.mysql.port,
  })

  await sequelize.authenticate();
  
  sequelize.addModels([Project, Group, Data])

  rui.mysql = sequelize

  console.log('Connection has been established successfully.');
}

export default mysqlPlugin
