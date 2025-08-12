enum ColumnDataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

type Env = 'prod' | 'pre' | 'test'


export interface Data {
  id: number;
  projectId: number;
  groupId: number;
  type: ColumnDataType;
  env: Env;
  name: string;
  content: string;
  desc: string;
  createdAt: number;
  updatedAt: number;
}

export interface DoraemonOptions {
  env: `${Env}`;
  app: string;
  secret: string;
}

type Response<T> = Promise<{
  code: number,
  message?: string;
  data: T
}>

export type RequestFunction = <T>(api: string, payload: Record<string, unknown>) => Response<T>
