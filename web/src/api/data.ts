import request from "../utils/request";

enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
}

export interface DataListResult {
  id: number;
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
}

export const fetchDataList = (params: DataListParams) => request<DataListResult[]>({
  method: 'GET',
  params,
  url: '/api/data/data_list'
})
