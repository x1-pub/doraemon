import request from "../utils/request";

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

export interface DataListResult {
  id: number;
  projectId: number;
  groupId: number;
  type: DataType;
  name: string;
  content: string;
  version: number;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DataListParams {
  groupId: number | string;
  projectId: number;
}

export const fetchDataList = (params: DataListParams) => request<DataListResult[]>({
  method: 'GET',
  url: '/api/data/data_list',
  params,
})

interface CreateDataParams {
  groupId: number;
  name: string;
  type: DataType,
  content?: string;
  desc?: string;
}
export const createData = (data: CreateDataParams) => request<DataListResult>({
  method: 'POST',
  url: '/api/data/create_data',
  data,
})

interface DeleteDataParams {
  dataId: number;
  projectId: number;
}
export const deleteData = (data: DeleteDataParams) => request<void>({
  method: 'POST',
  url: '/api/data/delete_data',
  data,
})
