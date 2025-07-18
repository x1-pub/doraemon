enum ColumnDataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

export interface Data {
  groupId: number;
  type: ColumnDataType;
  name: string;
  content: string;
  desc: string;
  version: number;
}

export interface DoraemonOptions {
  app: string;
  secret: string;
}

type Response<T> = Promise<{
  code: number,
  message?: string;
  data: T
}>

export type RequestFunction = <T>(api: string, payload: Record<string, unknown>) => Response<T>
