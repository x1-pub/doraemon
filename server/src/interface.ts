import "@x1.pub/rui";
import type { Sequelize } from "sequelize";
import type { Server } from "@x1.pub/sso";

declare module "@x1.pub/rui" {
  interface RuiInstance {
    mysql: Sequelize
  }

  interface Context {
    sso: Server;
    user: {
      id: number;
      name: string;
      nameCn: string;
      email: string;
    }
  }
}