import { MidwayConfig } from '@midwayjs/core';

// @ts-ignore
import { local } from '../../sensitive-config.json'

export default {
  domain: 'http://doraemon.x1.pub',
  keys: 'dev_doraemon_x1_pub_2024_cloud',
  sso: {
    host: 'https://sso.x1.pub',
    ...local.sso,
  },
} as MidwayConfig;
