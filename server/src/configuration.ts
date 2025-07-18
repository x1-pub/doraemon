import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as crossDomain from '@midwayjs/cross-domain';
import * as sequelize from '@midwayjs/sequelize';
import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    sequelize,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([AuthMiddleware, ReportMiddleware]);
    // add filter
    this.app.useFilter([DefaultErrorFilter]);
  }
}
