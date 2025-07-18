import '@midwayjs/core';

export interface IUserOptions {
  uid: number;
}

export interface ISSOResData {
  code: number;
  message: string;
  data: {
    sessionId: string;
    loginUrl: string;
    id: number;
    name: string;
    nameCn: string;
    email: string;
  };
}

export interface IUserInfo {
  id: number;
  uname: string;
  unameCn: string;
  uemail: string;
}
