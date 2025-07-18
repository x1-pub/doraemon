import { MidwayConfig } from '@midwayjs/core';

// @ts-ignore
import { prod } from '../../sensitive-config.json'

export default {
  domain: 'https://doraemon.x1.pub',
  keys: 'doraemon_x1_pub_2024_cloud',
  koa: {
    port: 7102,
    globalPrefix: '/api',
  },
  sequelize: {
    dataSource: {
      default: {
        database: 'doraemon',
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        sync: true, // 是否 createTable
        entities: ['entity', '**/entity/*.entity.{j,t}s'],
        ...prod.mysql,
      },
    },
  },
  cors: {
    origin: '*',
  },
  sso: {
    host: 'https://sso.x1.pub',
    ...prod.sso,
  },
} as MidwayConfig;
